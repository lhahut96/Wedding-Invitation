"use client";

import { useRef } from "react";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";
import { useReveal } from "./useReveal";

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[2/3]"];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="px-4 py-24 md:px-12">
      <h2 className="reveal mb-12 text-center font-display text-5xl md:text-7xl italic">Khoảnh khắc</h2>
      <div className="columns-2 gap-4 md:columns-3">
        {wedding.gallery.map((p, i) => (
          <div key={i} className="reveal mb-4 break-inside-avoid">
            <Photo photo={p} className={`${ASPECTS[i % ASPECTS.length]} w-full rounded-sm`} />
          </div>
        ))}
      </div>
    </section>
  );
}
