import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Docs } from "@/models/Docs.models";
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

    const doc = await Docs.findById(id);
    if (!doc) return NextResponse.json({ message: "Document not found" }, { status: 404 });

    const publicId = doc.publicId || publicIdFromUrl(doc.PDF, "documents");
    await destroyAsset(publicId, "raw");
    await Docs.findByIdAndDelete(id);

    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error) {
    return errorResponse("Error deleting document", error);
  }
}