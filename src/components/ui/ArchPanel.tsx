import { ReactNode } from "react";

export function ArchPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`arch-top border border-gold-dim bg-ink-soft/80 pt-10 pb-6 px-6 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] ${className}`}
    >
      {children}
    </div>
  );
}
