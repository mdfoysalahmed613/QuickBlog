import dbConnect from "@/lib/dbConnect";
import transporter from "@/lib/mailer";
import User from "@/models/User";
import { usersSchema } from "@/schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    const result = usersSchema.safeParse({ email, password, name });
    if(!result.success){
      return NextResponse.json(
        { message: result.error.issues[0]?.message },
        { status: 400 }
      );
    }
    await dbConnect();
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User already registered" },
        { status: 400 }
      );
    }
    await User.create({ email, password, name });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Registration Successful',
    //   text: `Hello ${name},\n\nYour registration was successful!\n\nThank you for joining us.\n\nBest regards,\nTeam`
    // };

    // // Attempt to send the email but don't fail the registration if email sending fails.
    // let emailSent = true;
    // try {
    //   await transporter.sendMail(mailOptions);
    // } catch (emailErr) {
    //   console.error("Failed to send confirmation email:", emailErr);
    //   emailSent = false;
    // }

    // const responsePayload = emailSent
    //   ? { message: "User registered successfully" }
    //   : { message: "User registered successfully. Confirmation email could not be sent.", emailSent: false };

    return NextResponse.json({message:"User registered successfully"}, { status: 201 });

   } catch (err) {
    console.error("Error during registration:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}