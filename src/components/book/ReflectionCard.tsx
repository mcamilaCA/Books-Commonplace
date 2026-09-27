"use client";

import { useState } from "react";
import { ArchPanel } from "@/components/ui/ArchPanel";
import { Button } from "@/components/ui/Button";
import { TagPill } from "@/components/ui/TagPill";
import { updateReflection, deleteReflection } from "@/lib/actions";

export interface ReflectionCardData {
  id: string;
  bookId: string;
  title: string | null;
  body: string;
  createdAt: string;
  tags: { tag: { id: string; name: string; color: string | null } }[];
}

export function ReflectionCard({ reflection }: { reflection: ReflectionCardData }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ArchPanel>
        <form
          action={async (formData) => {
            await updateReflection(formData);
            setIsEditing(false);
          }}
          className="space-y-3"
        >
          <input type="hidden" name="id" value={reflection.id} />
          <input type="hidden" name="bookId" value={reflection.bookId} />
          <input
            name="title"
            defaultValue={reflection.title ?? ""}
            placeholder="Title (optional)"
            className="w-full border border-gold-dim bg-ink-soften p-2 font-serif text-lg text-parchment"
          />
          <textarea
            name="body"
            defaultValue={reflection.body}
            required
            rows={5}
            className="w-full border border-gold-dim bg-ink-soften p-2 text-parchment"
          />
          <input
            name="tags"
            defaultValue={reflection.tags.map((t) => t.tag.name).join(", ")}
            placeholder="Ideas, comma separated"
            className="w-full border border-gold-dim bg-ink-soften p-2 text-sm text-parchment"
          />
          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </ArchPanel>
    );
  }

  return (
    <ArchPanel>
      {reflection.title && (
        <h3 className="font-serif text-2xl text-gold-bright">{reflection.title}</h3>
      )}
      <p className="mt-2 whitespace-pre-wrap text-parchment/90 leading-relaxed">
        {reflection.body}
      </p>
      {reflection.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {reflection.tags.map(({ tag }) => (
            <TagPill key={tag.id} name={tag.name} color={tag.color} href={`/map?tag=${tag.id}`} />
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-4 border-t border-gold-dim/30 pt-3 text-xs small-caps-tracked text-parchment-dim/70">
        <span>{new Date(reflection.createdAt).toLocaleDateString()}</span>
        <button onClick={() => setIsEditing(true)} className="hover:text-gold-bright cursor-pointer">
          edit
        </button>
        <form
          action={async (formData) => {
            await deleteReflection(formData);
          }}
        >
          <input type="hidden" name="id" value={reflection.id} />
          <input type="hidden" name="bookId" value={reflection.bookId} />
          <button type="submit" className="hover:text-gold-bright cursor-pointer">
            remove
          </button>
        </form>
      </div>
    </ArchPanel>
  );
}
