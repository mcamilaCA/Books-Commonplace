import { NextResponse } from "next/server";
import { runSync } from "@/lib/sync";
import { PirateReadsError } from "@/lib/piratereads";

export async function POST() {
  try {
    const result = await runSync();
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof PirateReadsError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    const message = error instanceof Error ? error.message : "Sync failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
