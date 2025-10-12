import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}:{params:{id:string}}) {
  try {
    await dbConnect();
    const {id} = await params;
    const blog = await Blog.findById(id).lean();
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
}

export const DELETE = async (request: Request, {params}:{params:{id:string}}) => {
  try {
    await dbConnect();
    const {id} = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete blog",
    });
  }
}
