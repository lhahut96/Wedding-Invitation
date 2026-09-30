"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", {
        yPercent: 100, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-8 text-xs uppercase tracking-[0.3em] text-wine">{wedding.intro.kicker}</p>
      {wedding.intro.lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <p className="intro-line font-display text-4xl md:text-6xl leading-tight">{line}</p>
        </div>
      ))}
    </section>
  );
}
