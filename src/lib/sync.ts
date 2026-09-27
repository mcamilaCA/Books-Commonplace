import { Shelf } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getProfile } from "@/lib/profile";
import {
  fetchAllShelves,
  parseGoodreadsId,
  PirateReadsBook,
} from "@/lib/piratereads";

// If a book somehow appears under more than one shelf in the same sync,
// keep whichever shelf represents the more "final" reading state.
const SHELF_PRIORITY: Shelf[] = [
  "READ",
  "DID_NOT_FINISH",
  "CURRENTLY_READING",
  "WANT_TO_READ",
];

export interface SyncResult {
  goodreadsUserId: string;
  totalBooks: number;
  byShelf: Record<Shelf, number>;
  syncedAt: Date;
}

export async function runSync(): Promise<SyncResult> {
  const profile = await getProfile();
  if (!profile.goodreadsUserId) {
    throw new Error("No Goodreads user id configured yet.");
  }

  const shelfResults = await fetchAllShelves(profile.goodreadsUserId);

  const byId = new Map<string, { shelf: Shelf; book: PirateReadsBook }>();

  for (const { shelf, books } of shelfResults) {
    for (const book of books) {
      const id = parseGoodreadsId(book.book_link);
      const existing = byId.get(id);
      if (
        !existing ||
        SHELF_PRIORITY.indexOf(shelf) < SHELF_PRIORITY.indexOf(existing.shelf)
      ) {
        byId.set(id, { shelf, book });
      }
    }
  }

  const byShelf: Record<Shelf, number> = {
    CURRENTLY_READING: 0,
    WANT_TO_READ: 0,
    READ: 0,
    DID_NOT_FINISH: 0,
  };

  for (const [id, { shelf, book }] of byId) {
    byShelf[shelf] += 1;
    await prisma.book.upsert({
      where: { id },
      create: {
        id,
        title: book.book_title,
        author: book.book_author,
        isbn: book.isbn || null,
        coverSmall: book.book_cover_small || null,
        coverMedium: book.book_cover_medium || null,
        coverLarge: book.book_cover_large || null,
        goodreadsLink: book.book_link,
        avgRating: book.avg_rating ?? null,
        shelf,
      },
      update: {
        title: book.book_title,
        author: book.book_author,
        isbn: book.isbn || null,
        coverSmall: book.book_cover_small || null,
        coverMedium: book.book_cover_medium || null,
        coverLarge: book.book_cover_large || null,
        goodreadsLink: book.book_link,
        avgRating: book.avg_rating ?? null,
        shelf,
      },
    });
  }

  const syncedAt = new Date();
  await prisma.profile.update({
    where: { id: profile.id },
    data: { lastSyncedAt: syncedAt },
  });

  return {
    goodreadsUserId: profile.goodreadsUserId,
    totalBooks: byId.size,
    byShelf,
    syncedAt,
  };
}
