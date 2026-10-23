import { NextResponse } from "next/server";

export function errorResponse(message: string, error: unknown, status = 500) {
  console.error(message, error);
  return NextResponse.json(
    { message, error: error instanceof Error ? error.message : String(error) },
    { status }
  );
}

export function toDownloadUrl(url: string): string {
  return url.includes("fl_attachment") ? url : url.replace("/upload/", "/upload/fl_attachment:");
}