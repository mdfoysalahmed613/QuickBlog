import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({})
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({success:false,message:"Failed to fetch blogs"});
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const blog = await request.formData();
    const blogObject  = Object.fromEntries(blog.entries());
    console.log("Blog:", blogObject);
    await Blog.create(blogObject);
    
    return NextResponse.json({ success: true, data: blogObject,message:"Blog created successfully" });
  } catch (error) {
    console.log("Error processing POST request:", error);
    return NextResponse.json({ success: false, message: "Failed to process POST request" });
  }
}