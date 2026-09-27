import { Shelf } from "@prisma/client";

const BASE_URL = "https://api.piratereads.com";

export const SHELF_ENDPOINT: Record<Shelf, string> = {
  CURRENTLY_READING: "currently-reading",
  WANT_TO_READ: "want-to-read",
  READ: "read",
  DID_NOT_FINISH: "dnf",
};

export interface PirateReadsBook {
  book_title: string;
  book_author: string;
  book_cover_small: string;
  book_cover_medium: string;
  book_cover_large: string;
  isbn: string;
  book_link: string;
  avg_rating: number;
}

interface PirateReadsResponse {
  count: number;
  books: PirateReadsBook[];
}

export class PirateReadsError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "PirateReadsError";
  }
}

/** Pulls the stable Goodreads work id out of a /book/show/{id}-{slug} link. */
export function parseGoodreadsId(bookLink: string): string {
  const match = bookLink.match(/\/book\/show\/(\d+)/);
  if (match) return match[1];
  // Fall back to a deterministic slug so books without a parseable link still dedupe.
  return `slug:${bookLink.split("/book/show/")[1]?.split(/[?&]/)[0] ?? bookLink}`;
}

function normalizeBookLink(link: string): string {
  return link.replace(/&amp;/g, "&");
}

async function fetchShelfPage(
  goodreadsUserId: string,
  shelf: Shelf,
  page: number,
  perPage: number,
): Promise<PirateReadsResponse> {
  const endpoint = SHELF_ENDPOINT[shelf];
  const url = `${BASE_URL}/${encodeURIComponent(goodreadsUserId)}/${endpoint}?page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new PirateReadsError(
      `piratereads request failed (${res.status}) for ${shelf}`,
      res.status,
    );
  }

  return (await res.json()) as PirateReadsResponse;
}

/** Fetches every page of a single shelf for a Goodreads user, following `count` until exhausted. */
export async function fetchShelf(
  goodreadsUserId: string,
  shelf: Shelf,
  perPage = 100,
): Promise<PirateReadsBook[]> {
  const books: PirateReadsBook[] = [];
  let page = 1;

  while (true) {
    const data = await fetchShelfPage(goodreadsUserId, shelf, page, perPage);
    books.push(...data.books);

    if (books.length >= data.count || data.books.length === 0) break;
    page += 1;
  }

  return books.map((book) => ({
    ...book,
    book_link: normalizeBookLink(book.book_link),
  }));
}

export interface SyncedShelfBooks {
  shelf: Shelf;
  books: PirateReadsBook[];
}

/** Fetches all four shelves for a Goodreads user in parallel. */
export async function fetchAllShelves(
  goodreadsUserId: string,
): Promise<SyncedShelfBooks[]> {
  const shelves = Object.keys(SHELF_ENDPOINT) as Shelf[];
  return Promise.all(
    shelves.map(async (shelf) => ({
      shelf,
      books: await fetchShelf(goodreadsUserId, shelf),
    })),
  );
}
