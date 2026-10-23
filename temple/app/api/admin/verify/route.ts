import { NextRequest, NextResponse } from "next/server";
import { verifyAuth, unauthorized } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) return unauthorized();
  return NextResponse.json({ ok: true });
}