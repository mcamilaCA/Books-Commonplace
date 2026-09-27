/** A small symmetrical vine-and-leaf divider — the Ghibli botanical touch amid the gothic ironwork. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      className={`h-4 w-full text-gold-dim ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M0 12 H70" />
      <path d="M130 12 H200" />
      <circle cx="100" cy="12" r="3" fill="currentColor" />
      <path d="M100 12 C 88 -2, 70 2, 76 12 C 70 22, 88 26, 100 12" />
      <path d="M100 12 C 112 -2, 130 2, 124 12 C 130 22, 112 26, 100 12" />
      <path d="M80 12 q -4 -6 -10 -4" />
      <path d="M120 12 q 4 -6 10 -4" />
    </svg>
  );
}
