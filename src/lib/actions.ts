"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { parseTagInput, resolveTagIds } from "@/lib/tags";
import { updateProfile } from "@/lib/profile";
import { runSync } from "@/lib/sync";

function revalidateBook(bookId: string) {
  revalidatePath(`/books/${bookId}`);
  revalidatePath("/timeline");
  revalidatePath("/map");
}

export async function createQuote(formData: FormData) {
  const bookId = String(formData.get("bookId") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  if (!bookId || !text) return;

  const pageRaw = String(formData.get("pageNumber") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const tagIds = await resolveTagIds(parseTagInput(String(formData.get("tags") ?? "")));

  await prisma.quote.create({
    data: {
      bookId,
      text,
      pageNumber: pageRaw ? Number(pageRaw) : null,
      note: note || null,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });

  revalidateBook(bookId);
}

export async function updateQuote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  if (!id || !text) return;

  const pageRaw = String(formData.get("pageNumber") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const tagIds = await resolveTagIds(parseTagInput(String(formData.get("tags") ?? "")));

  await prisma.quote.update({
    where: { id },
    data: {
      text,
      pageNumber: pageRaw ? Number(pageRaw) : null,
      note: note || null,
      tags: {
        deleteMany: {},
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });

  revalidateBook(bookId);
}

export async function deleteQuote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  if (!id) return;
  await prisma.quote.delete({ where: { id } });
  revalidateBook(bookId);
}

export async function createReflection(formData: FormData) {
  const bookId = String(formData.get("bookId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!bookId || !body) return;

  const title = String(formData.get("title") ?? "").trim();
  const tagIds = await resolveTagIds(parseTagInput(String(formData.get("tags") ?? "")));

  await prisma.reflection.create({
    data: {
      bookId,
      title: title || null,
      body,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  });

  revalidateBook(bookId);
}

export async function updateReflection(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!id || !body) return;

  const title = String(formData.get("title") ?? "").trim();
  const tagIds = await resolveTagIds(parseTagInput(String(formData.get("tags") ?? "")));

  await prisma.reflection.update({
    where: { id },
    data: {
      title: title || null,
      body,
      tags: {
        deleteMany: {},
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });

  revalidateBook(bookId);
}

export async function deleteReflection(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  if (!id) return;
  await prisma.reflection.delete({ where: { id } });
  revalidateBook(bookId);
}

export async function saveProfileSettings(formData: FormData) {
  const goodreadsUserId = String(formData.get("goodreadsUserId") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim();
  await updateProfile({
    goodreadsUserId: goodreadsUserId || null,
    displayName: displayName || null,
  });
  revalidatePath("/settings");
}

export interface TriggerSyncState {
  status: "idle" | "ok" | "error";
  message?: string;
}

export async function triggerSync(): Promise<TriggerSyncState> {
  try {
    const result = await runSync();
    revalidatePath("/");
    revalidatePath("/settings");
    revalidatePath("/timeline");
    return {
      status: "ok",
      message: `Synced ${result.totalBooks} books from Goodreads.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Sync failed.",
    };
  }
}
