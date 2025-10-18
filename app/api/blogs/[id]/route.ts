import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, {params}:{params:Promise<{id:string}>}) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({
        message: "Blog not found",
      },{status: 404});
    }
    console.log("Fetched blog:", blog);
    return NextResponse.json(blog,{status:200});
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({
      message: "Failed to fetch blog",
    },{status: 500});
  }
}

export const DELETE = async (request: NextRequest, {params}:{params:Promise<{id:string}>}) => {
  try {
    await dbConnect();
    const {id} = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      message: "Failed to delete blog",
    },{status: 500});
  }
}
