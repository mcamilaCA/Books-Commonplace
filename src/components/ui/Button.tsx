import { ButtonHTMLAttributes } from "react";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const base =
    "small-caps-tracked text-sm px-4 py-2 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const variants: Record<string, string> = {
    primary: "bg-wine border-gold-dim text-parchment hover:bg-wine-bright hover:border-gold",
    secondary:
      "bg-transparent border-gold-dim text-gold-bright hover:bg-ink-soften hover:border-gold",
    ghost: "bg-transparent border-transparent text-parchment-dim hover:text-gold-bright",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
