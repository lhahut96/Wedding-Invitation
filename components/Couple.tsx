"use client";

import { useRef } from "react";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";
import { useReveal } from "./useReveal";

export default function Couple() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="couple" ref={root} className="px-6 py-24 md:px-16">
      <h2 className="reveal mb-16 text-center font-display text-5xl md:text-7xl italic">Cô dâu & Chú rể</h2>
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
        {[wedding.bride, wedding.groom].map((p, i) => (
          <article key={p.fullName} className={`reveal ${i === 1 ? "md:mt-32" : ""}`}>
            <Photo photo={p.photo} className="aspect-[3/4] w-full rounded-sm" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-wine">{p.role}</p>
            <h3 className="mt-2 font-display text-4xl">{p.fullName}</h3>
            <p className="mt-3 max-w-sm text-ink/70">{p.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
