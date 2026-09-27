import { prisma } from "@/lib/db";

/** Single-user app: there is exactly one Profile row, created lazily. */
export async function getProfile() {
  const existing = await prisma.profile.findFirst();
  if (existing) return existing;
  return prisma.profile.create({ data: {} });
}

export async function updateProfile(data: {
  goodreadsUserId?: string | null;
  displayName?: string | null;
}) {
  const profile = await getProfile();
  return prisma.profile.update({ where: { id: profile.id }, data });
}
