"use client";

import { useRef } from "react";
import { wedding } from "@/content/wedding";
import Countdown from "./Countdown";
import { useReveal } from "./useReveal";

export default function Schedule() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="schedule" ref={root} className="bg-wine px-6 py-24 text-cream md:px-16">
      <h2 className="reveal text-center font-display text-5xl md:text-7xl italic">Lịch trình</h2>
      <p className="reveal mt-4 text-center tracking-[0.4em]">{wedding.dateLabel}</p>
      <div className="reveal my-16">
        <Countdown date={wedding.date} />
      </div>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {wedding.events.map((e) => (
          <article key={e.title} className="reveal rounded-sm border border-cream/20 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-blush">{e.time}</p>
            <h3 className="mt-3 font-display text-3xl">{e.title}</h3>
            <p className="mt-4 font-semibold">{e.place}</p>
            <p className="text-cream/70">{e.address}</p>
            <a
              href={e.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block border-b border-cream/60 pb-0.5 text-sm hover:border-cream"
            >
              Xem bản đồ →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
