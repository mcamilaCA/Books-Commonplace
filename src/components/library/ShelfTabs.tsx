"use client";

import { useState } from "react";
import { Shelf } from "@prisma/client";
import { SHELF_LABEL, SHELF_ORDER } from "@/lib/shelves";
import { BookCard, BookCardData } from "@/components/library/BookCard";

export function ShelfTabs({ books }: { books: (BookCardData & { shelf: Shelf })[] }) {
  const [active, setActive] = useState<Shelf | "ALL">("CURRENTLY_READING");

  const counts = SHELF_ORDER.reduce<Record<Shelf, number>>(
    (acc, shelf) => {
      acc[shelf] = books.filter((b) => b.shelf === shelf).length;
      return acc;
    },
    {} as Record<Shelf, number>,
  );

  const visible = active === "ALL" ? books : books.filter((b) => b.shelf === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-gold-dim/50 pb-4">
        {SHELF_ORDER.map((shelf) => (
          <button
            key={shelf}
            onClick={() => setActive(shelf)}
            className={`small-caps-tracked border px-3 py-1.5 text-sm transition-colors ${
              active === shelf
                ? "border-gold bg-wine text-parchment"
                : "border-gold-dim/60 text-parchment-dim hover:border-gold hover:text-gold-bright"
            }`}
          >
            {SHELF_LABEL[shelf]} · {counts[shelf]}
          </button>
        ))}
        <button
          onClick={() => setActive("ALL")}
          className={`small-caps-tracked border px-3 py-1.5 text-sm transition-colors ${
            active === "ALL"
              ? "border-gold bg-wine text-parchment"
              : "border-gold-dim/60 text-parchment-dim hover:border-gold hover:text-gold-bright"
          }`}
        >
          All · {books.length}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="mt-8 text-center text-parchment-dim italic">
          No books on this shelf yet. Sync from Goodreads to fill it.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
