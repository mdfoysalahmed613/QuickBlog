import mongoose, { model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    image: { type: String ,default: ""},
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
   if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
   }
   next();
});
const User = models?.User || model<IUser>("User", userSchema);

export default User;
