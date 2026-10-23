import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export function isValidSecret(input: string | null | undefined): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Same name as before, so all your existing POST/DELETE routes work unchanged
export function verifyAuth(request: NextRequest): boolean {
  return isValidSecret(request.headers.get("x-admin-secret"));
}

export function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}