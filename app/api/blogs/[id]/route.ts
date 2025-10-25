import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, {params}:{params:Promise<{id:string}>}) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blog ID",
      },{status: 400});
    }
    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return NextResponse.json({
        message: "Blog not found",
      },{status: 404});
    }
    console.log("Fetched blog:", blog);
    return NextResponse.json({
      success: true,
      data: blog,
    },{status:200});
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
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blog ID",
      },{status: 400});
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      },{status: 404});
    }
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete blog",
    },{status: 500});
  }
}

export const PATCH = async (request: NextRequest, {params}:{params:Promise<{id:string}>}) => {
  try {
    await dbConnect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blog ID",
      },{status: 400});
    }

    const { isPublished } = await request.json();

    const blog = await Blog.findByIdAndUpdate(id, { isPublished }, { new: true }).lean();
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      },{status: 404});
    }

    return NextResponse.json({
      success: true,
    },{status:200});
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update blog",
    },{status: 500});
  }
}
