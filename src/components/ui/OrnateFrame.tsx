import { ReactNode } from "react";

export function OrnateFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ornate-frame bg-parchment text-ink px-6 py-5 ${className}`}>
      <span className="corner-tl" />
      <span className="corner-tr" />
      <span className="corner-bl" />
      <span className="corner-br" />
      {children}
    </div>
  );
}
