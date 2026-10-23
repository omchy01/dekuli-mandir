export const MAX_FILE_SIZE = 40 * 1024 * 1024; // 40MB
export const MAX_GALLERY_IMAGES = 5;

export function validateImage(file: File): string | null {
  if (!file.type.startsWith("image/")) return "Only image files are allowed!";
  if (file.size > MAX_FILE_SIZE) return "File too large. Maximum size is 40MB.";
  return null;
}

export function validatePdf(file: File): string | null {
  if (file.type !== "application/pdf") return "Only PDF files are allowed!";
  if (file.size > MAX_FILE_SIZE) return "File too large. Maximum size is 40MB.";
  return null;
}

export function getFiles(formData: FormData, field: string): File[] {
  return formData.getAll(field).filter((v): v is File => v instanceof File && v.size > 0);
}