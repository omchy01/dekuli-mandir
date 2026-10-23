import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Img } from "@/models/Img.models";
import { destroyAsset, publicIdFromUrl } from "@/lib/cloudinary";
import { verifyAuth, unauthorized } from "@/lib/auth";
import { errorResponse } from "@/lib/api";

 

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAuth(request)) return unauthorized();

  try {
    const { id } = await params;
    await connectDB();

    const image = await Img.findById(id);
    if (!image) return NextResponse.json({ message: "Image not found" }, { status: 404 });

    const publicId = image.publicId || publicIdFromUrl(image.imgUrl, "images");
    await destroyAsset(publicId, "image");
    await Img.findByIdAndDelete(id);

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return errorResponse("Error deleting image", error);
  }
}