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
      gsap.from(".intro-block", {
        y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const { intro } = wedding;

  return (
    <section ref={root} className="relative w-full overflow-hidden bg-cream">
      <div className="grid gap-3 px-6 pt-20 pb-24 md:px-16 lg:grid-cols-10">
        <p className="intro-block font-display text-3xl italic lg:col-span-2">{intro.kicker}</p>
        <p className="intro-block text-lg font-semibold lg:col-span-2">{intro.subtitle}</p>
        <div className="intro-block space-y-3 text-lg font-light leading-snug lg:col-span-6">
          {intro.lines.map((line, i) => (
            <p key={i} className={i === intro.lines.length - 1 ? "font-display text-xl italic font-semibold" : ""}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
