import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import { wedding } from "@/content/wedding";
import "./globals.css";

// Same pairing as the reference site: Playfair Display for everything, Lora as fallback.
const body = Lora({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});
const body2 = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: wedding.meta.title,
  description: wedding.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${body.variable} ${body2.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
