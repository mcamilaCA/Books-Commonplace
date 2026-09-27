import { NextRequest, NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/profile";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const goodreadsUserId =
    typeof body.goodreadsUserId === "string" ? body.goodreadsUserId.trim() : undefined;
  const displayName =
    typeof body.displayName === "string" ? body.displayName.trim() : undefined;

  const profile = await updateProfile({
    goodreadsUserId: goodreadsUserId || null,
    displayName: displayName || null,
  });

  return NextResponse.json(profile);
}
