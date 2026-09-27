import Link from "next/link";
import Image from "next/image";

export interface BookCardData {
  id: string;
  title: string;
  author: string;
  coverMedium: string | null;
  avgRating: number | null;
  quoteCount: number;
  reflectionCount: number;
}

export function BookCard({ book }: { book: BookCardData }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group flex gap-4 border border-gold-dim/60 bg-ink-soft/70 p-3 transition-colors hover:border-gold hover:bg-ink-soften"
    >
      <div className="relative h-28 w-20 shrink-0 overflow-hidden border border-gold-dim/70 bg-ink-soften shadow-inner">
        {book.coverMedium ? (
          <Image
            src={book.coverMedium}
            alt={book.title}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center px-1 text-center font-serif text-[10px] text-gold-dim">
            {book.title}
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-between py-0.5">
        <div>
          <h3 className="font-serif text-lg leading-tight text-parchment group-hover:text-gold-bright transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-parchment-dim italic">{book.author}</p>
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-parchment-dim/80 small-caps-tracked">
          {book.avgRating != null && book.avgRating > 0 && (
            <span>{book.avgRating.toFixed(2)} ★</span>
          )}
          {book.quoteCount > 0 && <span>{book.quoteCount} quotes</span>}
          {book.reflectionCount > 0 && <span>{book.reflectionCount} thoughts</span>}
        </div>
      </div>
    </Link>
  );
}
