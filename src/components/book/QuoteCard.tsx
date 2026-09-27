"use client";

import { useState } from "react";
import { OrnateFrame } from "@/components/ui/OrnateFrame";
import { Button } from "@/components/ui/Button";
import { TagPill } from "@/components/ui/TagPill";
import { updateQuote, deleteQuote } from "@/lib/actions";

export interface QuoteCardData {
  id: string;
  bookId: string;
  text: string;
  pageNumber: number | null;
  note: string | null;
  createdAt: string;
  tags: { tag: { id: string; name: string; color: string | null } }[];
}

export function QuoteCard({ quote }: { quote: QuoteCardData }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <OrnateFrame>
        <form
          action={async (formData) => {
            await updateQuote(formData);
            setIsEditing(false);
          }}
          className="space-y-3"
        >
          <input type="hidden" name="id" value={quote.id} />
          <input type="hidden" name="bookId" value={quote.bookId} />
          <textarea
            name="text"
            defaultValue={quote.text}
            required
            rows={3}
            className="w-full border border-ink/30 bg-parchment-dim/60 p-2 font-serif text-lg text-ink"
          />
          <div className="flex gap-3">
            <input
              name="pageNumber"
              type="number"
              min={0}
              defaultValue={quote.pageNumber ?? ""}
              placeholder="Page"
              className="w-24 border border-ink/30 bg-parchment-dim/60 p-2 text-sm text-ink"
            />
            <input
              name="tags"
              defaultValue={quote.tags.map((t) => t.tag.name).join(", ")}
              placeholder="Ideas, comma separated"
              className="flex-1 border border-ink/30 bg-parchment-dim/60 p-2 text-sm text-ink"
            />
          </div>
          <input
            name="note"
            defaultValue={quote.note ?? ""}
            placeholder="A note on why this struck you"
            className="w-full border border-ink/30 bg-parchment-dim/60 p-2 text-sm text-ink"
          />
          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="small-caps-tracked cursor-pointer border border-ink/20 px-4 py-2 text-sm text-ink/70 transition-colors hover:text-wine"
            >
              Cancel
            </button>
          </div>
        </form>
      </OrnateFrame>
    );
  }

  return (
    <OrnateFrame>
      <blockquote className="font-serif text-xl italic leading-relaxed text-ink">
        “{quote.text}”
      </blockquote>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink/70">
        {quote.pageNumber != null && <span className="small-caps-tracked">p. {quote.pageNumber}</span>}
      </div>
      {quote.note && <p className="mt-2 text-sm text-ink/80">{quote.note}</p>}
      {quote.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {quote.tags.map(({ tag }) => (
            <TagPill key={tag.id} name={tag.name} color={tag.color} href={`/map?tag=${tag.id}`} />
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-4 border-t border-ink/10 pt-3 text-xs small-caps-tracked text-ink/50">
        <button onClick={() => setIsEditing(true)} className="hover:text-wine cursor-pointer">
          edit
        </button>
        <form
          action={async (formData) => {
            await deleteQuote(formData);
          }}
        >
          <input type="hidden" name="id" value={quote.id} />
          <input type="hidden" name="bookId" value={quote.bookId} />
          <button type="submit" className="hover:text-wine cursor-pointer">
            remove
          </button>
        </form>
      </div>
    </OrnateFrame>
  );
}
