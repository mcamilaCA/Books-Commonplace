import Link from "next/link";

export function TagPill({
  name,
  color,
  href,
}: {
  name: string;
  color?: string | null;
  href?: string;
}) {
  const dot = (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: color ?? "#b28a3f" }}
    />
  );

  const classes =
    "inline-flex items-center gap-1.5 rounded-full border border-gold-dim/70 bg-ink-soften px-2.5 py-0.5 text-xs tracking-wide text-parchment-dim small-caps-tracked";

  if (href) {
    return (
      <Link href={href} className={`${classes} hover:border-gold hover:text-gold-bright transition-colors`}>
        {dot}
        {name}
      </Link>
    );
  }

  return (
    <span className={classes}>
      {dot}
      {name}
    </span>
  );
}
