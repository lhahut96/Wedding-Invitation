"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".intro-block", {
        y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      // The two names start apart and slide together as the headline crosses the viewport.
      const gap = window.innerWidth >= 1024 ? 60 : window.innerWidth >= 768 ? 40 : 20;
      gsap
        .timeline({ scrollTrigger: { trigger: headline.current, start: "top bottom", end: "bottom top", scrub: 0.6 } })
        .fromTo(".intro-name-left", { x: -gap }, { x: 0, ease: "power2.out" }, 0)
        .fromTo(".intro-name-right", { x: gap }, { x: 0, ease: "power2.out" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  const { intro, groom, bride } = wedding;

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

      <h2
        ref={headline}
        className="translate-y-5 whitespace-nowrap px-4 font-display text-[16vw] uppercase leading-none text-wine md:translate-y-8 lg:translate-y-16 lg:text-[160px]"
      >
        <span className="intro-name-left inline-block">{groom.name}</span>
        <span className="mx-3 inline-block">&</span>
        <span className="intro-name-right inline-block">{bride.name}</span>
      </h2>
    </section>
  );
}
