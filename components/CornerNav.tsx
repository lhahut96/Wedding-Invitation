"use client";

import { wedding } from "@/content/wedding";
import { scrollToId } from "./SmoothScroll";

// Four links pinned to the corners. Each is a small dark pill so it stays readable on any background
// (bright hero photo, cream sections, the gradient in between), which blend modes could not guarantee.
export default function CornerNav() {
  const [tl, bl, tr, br] = wedding.nav;
  const link = (item: (typeof wedding.nav)[number]) => (
    <button
      onClick={() => scrollToId(item.target)}
      className="pointer-events-auto cursor-pointer rounded-full bg-ink/25 px-3 py-1.5 text-[11px] font-semibold text-cream backdrop-blur-sm transition hover:bg-ink/45 md:text-xs"
    >
      {item.label}
    </button>
  );

  return (
    <nav className="pointer-events-none fixed inset-0 z-50 flex justify-between px-3 md:px-8">
      <div className="flex flex-col justify-between py-4 md:py-6">
        {link(tl)}
        {link(bl)}
      </div>
      <div className="flex flex-col items-end justify-between py-4 md:py-6">
        {link(tr)}
        {link(br)}
      </div>
    </nav>
  );
}
