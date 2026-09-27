import Link from "next/link";
import { Flourish } from "@/components/Flourish";

const LINKS = [
  { href: "/", label: "Library" },
  { href: "/timeline", label: "Timeline" },
  { href: "/map", label: "Idea Map" },
  { href: "/settings", label: "Settings" },
];

export function NavBar() {
  return (
    <header className="border-b border-gold-dim/70 bg-ink-soft/90 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Link
            href="/"
            className="font-display text-xl tracking-[0.2em] text-gold-bright small-caps-tracked"
          >
            The Commonplace
          </Link>
          <nav className="flex gap-6">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="small-caps-tracked text-sm text-parchment-dim hover:text-gold-bright transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Flourish className="mt-3" />
      </div>
    </header>
  );
}
