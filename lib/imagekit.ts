import ImageKit from "imagekit";

// Initialize ImageKit with your credentials for server-side operations
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

// Upload image to ImageKit
export const uploadImageToImageKit = async (
  file: Buffer | string,
  fileName: string,
  folder?: string
): Promise<{ url: string; fileId: string }> => {
  try {
    const uploadResponse = await imagekit.upload({
      file, // Buffer or base64 string
      fileName,
      folder: folder || "blog-images", // Default folder for blog images
      useUniqueFileName: true, // Automatically generate unique names
    });

    return {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  } catch (error) {
    console.error("Error uploading to ImageKit:", error);
    throw new Error("Failed to upload image to ImageKit");
  }
};

// Delete image from ImageKit (optional - for cleanup)
export const deleteImageFromImageKit = async (
  fileId: string
): Promise<boolean> => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error("Error deleting from ImageKit:", error);
    return false;
  }
};



export default imagekit;
