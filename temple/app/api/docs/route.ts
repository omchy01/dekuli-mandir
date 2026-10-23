import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Docs } from "@/models/Docs.models";
import { uploadPdfFile } from "@/lib/cloudinary";
import { validatePdf } from "@/lib/upload";
import { verifyAuth, unauthorized } from "@/lib/auth";
import { errorResponse, toDownloadUrl } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    const docs = await Docs.find().sort({ createdAt: -1 });
    return NextResponse.json({ docs });
  } catch (error) {
    return errorResponse("Error fetching documents", error);
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) return unauthorized();

  try {
    await connectDB();
    const formData = await request.formData();

    const eventName = formData.get("eventName") as string | null;
    const eventDate = formData.get("eventDate") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("pdf");

    if (!eventName || !eventDate || !description) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: "PDF file is required" }, { status: 400 });
    }
    const invalid = validatePdf(file);
    if (invalid) return NextResponse.json({ message: invalid }, { status: 400 });

    const result = await uploadPdfFile(file);
    const originalPdfUrl = result.secure_url;
    const downloadUrl = toDownloadUrl(originalPdfUrl);

    const newDoc = await Docs.create({
      eventName,
      eventDate,
      description,
      PDF: downloadUrl,
      publicId: result.public_id,
      originalFilename: file.name,
    });

    return NextResponse.json(
      {
        message: "Document created successfully",
        document: newDoc,
        pdfUrl: downloadUrl,
        viewUrl: originalPdfUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse("Error creating document", error);
  }
}