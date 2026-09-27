import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SHELF_LABEL } from "@/lib/shelves";
import { createQuote, createReflection } from "@/lib/actions";
import { QuoteCard } from "@/components/book/QuoteCard";
import { ReflectionCard } from "@/components/book/ReflectionCard";
import { Flourish } from "@/components/Flourish";
import { Button } from "@/components/ui/Button";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      quotes: {
        orderBy: { createdAt: "desc" },
        include: { tags: { include: { tag: true } } },
      },
      reflections: {
        orderBy: { createdAt: "desc" },
        include: { tags: { include: { tag: true } } },
      },
    },
  });

  if (!book) notFound();

  return (
    <div className="space-y-12">
      <section className="flex flex-col gap-6 sm:flex-row">
        <div className="relative mx-auto h-56 w-40 shrink-0 overflow-hidden border border-gold-dim bg-ink-soften shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] sm:mx-0">
          {book.coverLarge ? (
            <Image src={book.coverLarge} alt={book.title} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center p-2 text-center font-serif text-gold-dim">
              {book.title}
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <p className="small-caps-tracked text-sm text-gold-dim">{SHELF_LABEL[book.shelf]}</p>
          <h1 className="font-display text-3xl text-gold-bright">{book.title}</h1>
          <p className="mt-1 font-serif text-xl italic text-parchment-dim">{book.author}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-parchment-dim sm:justify-start">
            {book.avgRating != null && book.avgRating > 0 && <span>{book.avgRating.toFixed(2)} ★ average</span>}
            {book.isbn && <span>ISBN {book.isbn}</span>}
            {book.goodreadsLink && (
              <a
                href={book.goodreadsLink}
                target="_blank"
                rel="noreferrer"
                className="text-dusk hover:text-gold-bright underline underline-offset-4"
              >
                View on Goodreads
              </a>
            )}
          </div>
        </div>
      </section>

      <Flourish />

      <section>
        <h2 className="font-display text-2xl tracking-wide text-gold-bright">Favorite Quotes</h2>
        <div className="mt-6 space-y-6">
          {book.quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={{ ...quote, createdAt: quote.createdAt.toISOString() }}
            />
          ))}
        </div>

        <form action={createQuote} className="mt-8 space-y-3 border border-gold-dim/50 bg-ink-soft/60 p-5">
          <input type="hidden" name="bookId" value={book.id} />
          <p className="small-caps-tracked text-sm text-gold-dim">Add a quote</p>
          <textarea
            name="text"
            required
            rows={3}
            placeholder="Copy the passage as it appears on the page…"
            className="w-full border border-gold-dim/60 bg-ink-soften p-2 font-serif text-lg text-parchment placeholder:text-parchment-dim/50"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="pageNumber"
              type="number"
              min={0}
              placeholder="Page"
              className="w-full border border-gold-dim/60 bg-ink-soften p-2 text-sm text-parchment placeholder:text-parchment-dim/50 sm:w-24"
            />
            <input
              name="tags"
              placeholder="Ideas, comma separated (e.g. selfishness, isolation)"
              className="flex-1 border border-gold-dim/60 bg-ink-soften p-2 text-sm text-parchment placeholder:text-parchment-dim/50"
            />
          </div>
          <input
            name="note"
            placeholder="A note on why this struck you (optional)"
            className="w-full border border-gold-dim/60 bg-ink-soften p-2 text-sm text-parchment placeholder:text-parchment-dim/50"
          />
          <Button type="submit" variant="primary">
            Save Quote
          </Button>
        </form>
      </section>

      <Flourish />

      <section>
        <h2 className="font-display text-2xl tracking-wide text-gold-bright">Thoughts &amp; Reflections</h2>
        <div className="mt-6 space-y-6">
          {book.reflections.map((reflection) => (
            <ReflectionCard
              key={reflection.id}
              reflection={{ ...reflection, createdAt: reflection.createdAt.toISOString() }}
            />
          ))}
        </div>

        <form
          action={createReflection}
          className="mt-8 space-y-3 border border-gold-dim/50 bg-ink-soft/60 p-5"
        >
          <input type="hidden" name="bookId" value={book.id} />
          <p className="small-caps-tracked text-sm text-gold-dim">Add a reflection</p>
          <input
            name="title"
            placeholder="Title (optional)"
            className="w-full border border-gold-dim/60 bg-ink-soften p-2 font-serif text-lg text-parchment placeholder:text-parchment-dim/50"
          />
          <textarea
            name="body"
            required
            rows={5}
            placeholder="What did this book, or this part of it, set loose in your thinking?"
            className="w-full border border-gold-dim/60 bg-ink-soften p-2 text-parchment placeholder:text-parchment-dim/50"
          />
          <input
            name="tags"
            placeholder="Ideas, comma separated (e.g. mortality, ambition)"
            className="w-full border border-gold-dim/60 bg-ink-soften p-2 text-sm text-parchment placeholder:text-parchment-dim/50"
          />
          <Button type="submit" variant="primary">
            Save Reflection
          </Button>
        </form>
      </section>

      <div className="text-center">
        <Link href="/" className="small-caps-tracked text-sm text-parchment-dim hover:text-gold-bright">
          ← back to the library
        </Link>
      </div>
    </div>
  );
}
