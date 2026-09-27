import { getProfile } from "@/lib/profile";
import { prisma } from "@/lib/db";
import { saveProfileSettings } from "@/lib/actions";
import { SyncButton } from "@/components/SyncButton";
import { Button } from "@/components/ui/Button";
import { ArchPanel } from "@/components/ui/ArchPanel";
import { Flourish } from "@/components/Flourish";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const profile = await getProfile();
  const [bookCount, quoteCount, reflectionCount, tagCount] = await Promise.all([
    prisma.book.count(),
    prisma.quote.count(),
    prisma.reflection.count(),
    prisma.tag.count(),
  ]);

  return (
    <div className="mx-auto max-w-lg space-y-10">
      <section className="text-center">
        <p className="small-caps-tracked text-sm text-gold-dim">the reader</p>
        <h1 className="font-display text-3xl text-gold-bright">Settings</h1>
      </section>

      <ArchPanel>
        <h2 className="font-serif text-xl text-parchment">Goodreads Connection</h2>
        <p className="mt-1 text-sm text-parchment-dim">
          Piratereads reads your public Goodreads shelves by user id — the number and
          slug in your profile URL, e.g. <code>goodreads.com/user/show/12345678-jane</code>{" "}
          → <code>12345678-jane</code>.
        </p>
        <form action={saveProfileSettings} className="mt-5 space-y-4">
          <div>
            <label className="small-caps-tracked text-xs text-gold-dim">Goodreads user id</label>
            <input
              name="goodreadsUserId"
              defaultValue={profile.goodreadsUserId ?? ""}
              placeholder="12345678-jane"
              className="mt-1 w-full border border-gold-dim/60 bg-ink-soften p-2 text-parchment placeholder:text-parchment-dim/40"
            />
          </div>
          <div>
            <label className="small-caps-tracked text-xs text-gold-dim">Display name</label>
            <input
              name="displayName"
              defaultValue={profile.displayName ?? ""}
              placeholder="Jane"
              className="mt-1 w-full border border-gold-dim/60 bg-ink-soften p-2 text-parchment placeholder:text-parchment-dim/40"
            />
          </div>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </form>
      </ArchPanel>

      <div className="text-center">
        <SyncButton />
        {profile.lastSyncedAt && (
          <p className="mt-2 text-xs text-parchment-dim/70">
            Last synced {profile.lastSyncedAt.toLocaleString()}
          </p>
        )}
      </div>

      <Flourish />

      <section className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        {[
          ["Books", bookCount],
          ["Quotes", quoteCount],
          ["Reflections", reflectionCount],
          ["Ideas", tagCount],
        ].map(([label, count]) => (
          <div key={label as string} className="border border-gold-dim/50 bg-ink-soft/60 py-4">
            <p className="font-display text-2xl text-gold-bright">{count}</p>
            <p className="small-caps-tracked text-xs text-parchment-dim">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
