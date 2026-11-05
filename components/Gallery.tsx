"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "./useReveal";
import { scrollToId } from "./SmoothScroll";

const INITIAL_COUNT = 6;

// Masonry grid of thumbnails; clicking one opens a full-size lightbox (arrows / swipe / Esc).
export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const photos = wedding.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? photos : photos.slice(0, INITIAL_COUNT);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  // Photos revealed by "Xem thêm" fade in, and scroll positions are recalculated for the taller section.
  useEffect(() => {
    if (!expanded) return;
    gsap.from(".gallery-extra", { opacity: 0, y: 30, duration: 0.7, stagger: 0.04, ease: "power3.out" });
    ScrollTrigger.refresh();
  }, [expanded]);

  const current = open === null ? null : photos[open];

  return (
    <section id="gallery" ref={root} className="bg-cream px-4 py-24 md:px-10">
      <div className="reveal text-center">
        <h2 className="font-display text-5xl italic md:text-7xl">{wedding.galleryLabel.title}</h2>
      </div>

      <div className="mx-auto mt-14 max-w-6xl columns-2 gap-3 md:columns-3 md:gap-4">
        {visible.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpen(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={`group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-sm md:mb-4 ${i < INITIAL_COUNT ? "reveal" : "gallery-extra"}`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => {
            if (expanded) scrollToId("gallery");
            setExpanded(!expanded);
          }}
          className="cursor-pointer rounded-full border border-ink/30 px-8 py-3 text-xs uppercase tracking-[0.3em] transition hover:bg-ink hover:text-cream"
        >
          {expanded ? "Thu gọn" : `Xem thêm (${photos.length - INITIAL_COUNT})`}
        </button>
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <img
            src={current.full ?? current.src}
            alt={current.alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Đóng"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 cursor-pointer p-2 text-3xl leading-none text-white/80 hover:text-white"
          >
            ×
          </button>
          {[-1, 1].map((d) => (
            <button
              key={d}
              aria-label={d < 0 ? "Ảnh trước" : "Ảnh sau"}
              onClick={(e) => {
                e.stopPropagation();
                step(d);
              }}
              className={`absolute top-1/2 -translate-y-1/2 cursor-pointer p-3 text-4xl text-white/70 hover:text-white ${
                d < 0 ? "left-2 md:left-6" : "right-2 md:right-6"
              }`}
            >
              {d < 0 ? "‹" : "›"}
            </button>
          ))}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {(open ?? 0) + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
