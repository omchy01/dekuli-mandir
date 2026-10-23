import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

function uploadBuffer(buffer: Buffer, options: UploadApiOptions): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result);
      })
      .end(buffer);
  });
}

export async function uploadImageFile(file: File): Promise<UploadApiResponse> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, {
    folder: "images",
    resource_type: "image",
    transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
  });
}

export async function uploadPdfFile(file: File): Promise<UploadApiResponse> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBuffer(buffer, {
    folder: "documents",
    resource_type: "raw",
    use_filename: true,
    unique_filename: false,
    // raw files need the extension inside public_id
    public_id: file.name.replace(/\.[^/.]+$/, "") + ".pdf",
  });
}

/** Fallback for old records that were saved without a publicId */
export function publicIdFromUrl(url: string, folder: "images" | "documents"): string {
  const last = url.split("/").pop() ?? "";
  const clean = last.split("?")[0];
  // raw files keep their extension in the public_id, images don't
  return folder === "documents"
    ? `documents/${clean}`
    : `images/${clean.replace(/\.[^/.]+$/, "")}`;
}

export async function destroyAsset(publicId: string, resourceType: "image" | "raw") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}