import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Crimson_Pro } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The Commonplace",
  description:
    "A Renaissance commonplace book for your Goodreads shelves — quotes, reflections, and the ideas that connect them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${crimson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="page-root" className="flex min-h-full flex-col">
          <NavBar />
          <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
          <footer className="border-t border-gold-dim/50 py-6 text-center text-xs text-parchment-dim/70 small-caps-tracked">
            a private library, kept by hand
          </footer>
        </div>
      </body>
    </html>
  );
}
