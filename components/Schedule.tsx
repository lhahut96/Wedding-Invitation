"use client";

import { useRef } from "react";
import { wedding } from "@/content/wedding";
import { useReveal } from "./useReveal";

// Venue card followed by an alternating vertical timeline.
export default function Schedule() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const { venue, timeline } = wedding;

  return (
    <section id="schedule" ref={root} className="bg-cream">
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-wine">{venue.lead}</p>
        <h2 className="reveal mt-4 font-display text-6xl italic md:text-9xl">{venue.name}</h2>
        <p className="reveal mt-8 text-sm uppercase tracking-[0.3em]">{venue.kind}</p>
        <p className="reveal mt-2 max-w-md text-ink/70">{venue.address}</p>
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="reveal mt-8 rounded-full bg-ink px-8 py-3 text-sm text-cream transition hover:bg-wine"
        >
          Chỉ đường
        </a>
      </div>

      <div className="px-6 pb-32 md:px-16">
        <h2 className="reveal text-center font-display text-5xl italic md:text-7xl">
          The Timeline <span className="block text-2xl not-italic tracking-[0.3em] uppercase md:text-3xl">wedding</span>
        </h2>
        <ol className="relative mx-auto mt-16 max-w-3xl before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-wine/40 md:before:left-1/2">
          {timeline.map((t, i) => (
            <li
              key={t.time}
              className={`reveal relative pb-12 pl-10 last:pb-0 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
              }`}
            >
              <span
                className={`absolute left-0 top-2 size-4 rounded-full bg-wine ${
                  i % 2 === 0 ? "md:-left-2" : "md:left-auto md:-right-2"
                }`}
              />
              <p className="font-display text-2xl italic text-wine">{t.time}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.25em]">{t.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
