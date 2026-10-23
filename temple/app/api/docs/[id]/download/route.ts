import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Docs } from "@/models/Docs.models";
import { errorResponse, toDownloadUrl } from "@/lib/api";

 

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const doc = await Docs.findById(id);
    if (!doc) return NextResponse.json({ message: "Document not found" }, { status: 404 });

    return NextResponse.json({
      downloadUrl: toDownloadUrl(doc.PDF),
      filename: doc.originalFilename || `${doc.eventName}.pdf`,
    });
  } catch (error) {
    return errorResponse("Error getting download URL", error);
  }
}