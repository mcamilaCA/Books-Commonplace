import { prisma } from "@/lib/db";

const PALETTE = ["#8a2c3b", "#b98a2f", "#4a5f4d", "#5a6b8c", "#7c5a8c", "#a15c2f"];

export function colorForTag(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

/** Splits a free-text tag field ("selfishness, isolation") into normalized names. */
export function parseTagInput(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  for (const part of raw.split(",")) {
    const name = part.trim().toLowerCase();
    if (name) seen.add(name);
  }
  return [...seen];
}

/** Ensures each tag name exists, returning their ids. */
export async function resolveTagIds(names: string[]): Promise<string[]> {
  if (names.length === 0) return [];
  const ids: string[] = [];
  for (const name of names) {
    const tag = await prisma.tag.upsert({
      where: { name },
      create: { name, color: colorForTag(name) },
      update: {},
    });
    ids.push(tag.id);
  }
  return ids;
}
