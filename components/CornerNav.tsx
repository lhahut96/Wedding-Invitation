"use client";

import { wedding } from "@/content/wedding";
import { scrollToId } from "./SmoothScroll";

// Four links pinned to the corners; mix-blend-difference keeps them readable on any background.
export default function CornerNav() {
  const [tl, bl, tr, br] = wedding.nav;
  const link = (item: (typeof wedding.nav)[number]) => (
    <button
      onClick={() => scrollToId(item.target)}
      className="pointer-events-auto cursor-pointer px-3 md:px-8 text-[11px] md:text-xs font-semibold text-white transition hover:underline hover:underline-offset-2"
    >
      {item.label}
    </button>
  );

  return (
    <nav className="pointer-events-none fixed inset-0 z-50 flex justify-between mix-blend-difference">
      <div className="flex flex-col justify-between py-6 md:py-8">
        {link(tl)}
        {link(bl)}
      </div>
      <div className="flex flex-col items-end justify-between py-6 md:py-8">
        {link(tr)}
        {link(br)}
      </div>
    </nav>
  );
}
