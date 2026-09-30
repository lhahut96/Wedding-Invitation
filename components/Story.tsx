"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";

// Pinned horizontal-scroll timeline.
export default function Story() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () => (track.current?.scrollWidth ?? 0) - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="h-screen overflow-hidden bg-ink text-cream">
      <div ref={track} className="flex h-full w-max items-center gap-12 px-[10vw]">
        <div className="w-[70vw] shrink-0 md:w-[35vw]">
          <p className="text-xs uppercase tracking-[0.3em] text-blush">Chuyện tụi mình</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl italic leading-tight">Từ người lạ đến người nhà</h2>
        </div>
        {wedding.story.map((s) => (
          <article key={s.year} className="w-[70vw] shrink-0 md:w-[28vw]">
            <Photo photo={s.photo} className="aspect-[4/5] max-h-[55vh] w-full rounded-sm" />
            <p className="mt-6 font-display text-6xl text-blush">{s.year}</p>
            <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-cream/70">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
