import Link from "next/link";
import { prisma } from "@/lib/db";
import { TagPill } from "@/components/ui/TagPill";

export const dynamic = "force-dynamic";

interface TimelineEntry {
  id: string;
  kind: "quote" | "reflection";
  createdAt: Date;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  title: string | null;
  text: string;
  tags: { id: string; name: string; color: string | null }[];
}

export default async function TimelinePage() {
  const [quotes, reflections] = await Promise.all([
    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      include: { book: true, tags: { include: { tag: true } } },
    }),
    prisma.reflection.findMany({
      orderBy: { createdAt: "desc" },
      include: { book: true, tags: { include: { tag: true } } },
    }),
  ]);

  const entries: TimelineEntry[] = [
    ...quotes.map((q) => ({
      id: q.id,
      kind: "quote" as const,
      createdAt: q.createdAt,
      bookId: q.bookId,
      bookTitle: q.book.title,
      bookAuthor: q.book.author,
      title: null,
      text: q.text,
      tags: q.tags.map((t) => t.tag),
    })),
    ...reflections.map((r) => ({
      id: r.id,
      kind: "reflection" as const,
      createdAt: r.createdAt,
      bookId: r.bookId,
      bookTitle: r.book.title,
      bookAuthor: r.book.author,
      title: r.title,
      text: r.body,
      tags: r.tags.map((t) => t.tag),
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const groups = new Map<string, TimelineEntry[]>();
  for (const entry of entries) {
    const key = entry.createdAt.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }

  return (
    <div className="space-y-10">
      <section className="text-center">
        <p className="small-caps-tracked text-sm text-gold-dim">the record</p>
        <h1 className="font-display text-3xl text-gold-bright">Timeline</h1>
        <p className="mx-auto mt-3 max-w-xl font-serif italic text-parchment-dim">
          Every quote and reflection, in the order you set them down.
        </p>
      </section>

      {entries.length === 0 ? (
        <p className="text-center text-parchment-dim italic">
          Nothing kept yet — add a quote or reflection from any book&rsquo;s page.
        </p>
      ) : (
        [...groups.entries()].map(([month, monthEntries]) => (
          <section key={month}>
            <h2 className="small-caps-tracked mb-4 text-sm text-gold-dim">{month}</h2>
            <ol className="space-y-6 border-l border-gold-dim/50 pl-6">
              {monthEntries.map((entry) => (
                <li key={`${entry.kind}-${entry.id}`} className="relative">
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-gold bg-ink" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link
                      href={`/books/${entry.bookId}`}
                      className="font-serif text-lg text-parchment hover:text-gold-bright transition-colors"
                    >
                      {entry.bookTitle}
                    </Link>
                    <span className="text-xs text-parchment-dim/70">
                      {entry.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs italic text-parchment-dim/70">{entry.bookAuthor}</p>
                  {entry.kind === "quote" ? (
                    <blockquote className="mt-2 font-serif text-lg italic leading-relaxed text-parchment">
                      “{entry.text}”
                    </blockquote>
                  ) : (
                    <div className="mt-2">
                      {entry.title && (
                        <p className="font-serif text-lg text-gold-bright">{entry.title}</p>
                      )}
                      <p className="whitespace-pre-wrap text-parchment/90">{entry.text}</p>
                    </div>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <TagPill key={tag.id} name={tag.name} color={tag.color} href={`/map?tag=${tag.id}`} />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}
