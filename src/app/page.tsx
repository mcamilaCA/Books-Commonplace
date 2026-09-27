import { prisma } from "@/lib/db";
import { getProfile } from "@/lib/profile";
import { SyncButton } from "@/components/SyncButton";

export const dynamic = "force-dynamic";
import { ShelfTabs } from "@/components/library/ShelfTabs";
import { Flourish } from "@/components/Flourish";

export default async function LibraryPage() {
  const profile = await getProfile();

  const books = await prisma.book.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { quotes: true, reflections: true } } },
  });

  const shelfBooks = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverMedium: book.coverMedium,
    avgRating: book.avgRating,
    shelf: book.shelf,
    quoteCount: book._count.quotes,
    reflectionCount: book._count.reflections,
  }));

  return (
    <div className="space-y-10">
      <section className="text-center">
        <p className="small-caps-tracked text-sm text-gold-dim">a renaissance</p>
        <h1 className="font-display text-4xl tracking-wide text-gold-bright sm:text-5xl">
          Commonplace Book
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-parchment-dim">
          Every book you have read, are reading, or mean to read — with the quotes that
          struck you and the thoughts they set loose.
        </p>
        <Flourish className="mx-auto mt-6 max-w-xs" />

        <div className="mt-6 flex flex-col items-center gap-2">
          <SyncButton />
          {profile.lastSyncedAt ? (
            <p className="text-xs text-parchment-dim/70">
              Last synced {profile.lastSyncedAt.toLocaleString()}
            </p>
          ) : profile.goodreadsUserId ? (
            <p className="text-xs text-parchment-dim/70">Not yet synced.</p>
          ) : (
            <p className="text-xs text-parchment-dim/70">
              Add your Goodreads user id in Settings, then sync.
            </p>
          )}
        </div>
      </section>

      <ShelfTabs books={shelfBooks} />
    </div>
  );
}
