import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Img } from "@/models/Img.models";
import { uploadImageFile } from "@/lib/cloudinary";
import { getFiles, validateImage, MAX_GALLERY_IMAGES } from "@/lib/upload";
import { verifyAuth, unauthorized } from "@/lib/auth";
import { errorResponse } from "@/lib/api";

 

export async function GET() {
  try {
    await connectDB();
    const images = await Img.find().sort({ createdAt: -1 });
    return NextResponse.json({ images });
  } catch (error) {
    return errorResponse("Error fetching images", error);
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return unauthorized();

  try {
    await connectDB();
    const formData = await request.formData();
    const files = getFiles(formData, "images");

    if (files.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required for gallery upload", received: 0 },
        { status: 400 }
      );
    }
    if (files.length > MAX_GALLERY_IMAGES) {
      return NextResponse.json({ message: "Too many files uploaded." }, { status: 400 });
    }
    for (const file of files) {
      const invalid = validateImage(file);
      if (invalid) return NextResponse.json({ message: invalid }, { status: 400 });
    }

    const results = await Promise.all(files.map(uploadImageFile));
    const savedImages = await Img.insertMany(
      results.map((r) => ({ imgUrl: r.secure_url, publicId: r.public_id }))
    );

    return NextResponse.json(
      {
        message: `${files.length} image(s) uploaded to gallery successfully`,
        images: savedImages,
        imageUrls: results.map((r) => r.secure_url),
        count: files.length,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse("Error uploading gallery images", error);
  }
}