"use client";

import { wedding } from "@/content/wedding";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function Intro() {
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Couple photo drifts slowly as the hero scrolls into it.
      gsap.fromTo(".intro-photo", { yPercent: -8 }, {
        yPercent: 0, ease: "none",
        scrollTrigger: { trigger: ".intro-photo-wrap", start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      gsap.from(".intro-block", {
        y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: text.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const { intro, couplePhoto } = wedding;

  return (
    <section ref={root} className="relative w-full overflow-hidden bg-cream">
      {/* Couple photo (blended with the hero by <Transition />). */}
      <div className="intro-photo-wrap relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
        <img
          src={couplePhoto.src}
          alt={couplePhoto.alt}
          className="intro-photo absolute left-0 top-0 h-[115%] w-full object-cover object-[62%_center]"
        />
      </div>

      <div ref={text} className="grid gap-3 px-6 pt-6 pb-24 md:px-16 lg:grid-cols-10">
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
