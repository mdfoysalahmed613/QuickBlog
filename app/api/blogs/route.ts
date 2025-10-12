import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { uploadImageToImageKit } from "@/lib/imagekit";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();

    // Extract blog data
    const blogDataString = formData.get("blog") as string;
    const blogData = JSON.parse(blogDataString);

    // Extract image file
    const imageFile = formData.get("image") as File;

    let imageUrl = "";
    let imageId = "";

    // Upload image to ImageKit if provided
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `blog-${Date.now()}-${imageFile.name}`;
      const folder = "QuickBlog";
      const uploadResult = await uploadImageToImageKit(
        buffer,
        fileName,
        folder
      );

      imageUrl = uploadResult.url;
      imageId = uploadResult.fileId;
    }

    const newBlog = await Blog.create({
      ...blogData,
      image: imageUrl,
      imageId: imageId, // Store ImageKit file ID for potential deletion later
    });
    revalidatePath("/");
    return NextResponse.json(
      {
        data: newBlog,
        message: "Blog created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      {
        message: "Failed to process POST request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
