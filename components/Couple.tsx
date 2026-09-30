"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";

type Person = typeof wedding.groom;

// "Trần Quốc Bình" -> ["Trần Quốc", "Bình"]
function splitName(full: string) {
  const i = full.lastIndexOf(" ");
  return i < 0 ? ["", full] : [full.slice(0, i), full.slice(i + 1)];
}

function Profile({ person, reverse }: { person: Person; reverse?: boolean }) {
  const row = useRef<HTMLDivElement>(null);
  const [family, given] = splitName(person.fullName);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const dir = reverse ? 1 : -1;
    const ctx = gsap.context(() => {
      // Name slides in from the side, then the bio fades up.
      gsap
        .timeline({ scrollTrigger: { trigger: row.current, start: "top 80%", toggleActions: "play none none none" } })
        .from(".profile-name", { x: 120 * dir, opacity: 0, duration: 1, ease: "power2.out" })
        .from(".profile-bio", { y: 40, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.3");

      // Portrait drifts while scrolling (desktop) or slides in from the side (mobile).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 800px)", () => {
        gsap.to(".profile-photo", {
          y: -30, x: 60 * -dir, ease: "none",
          scrollTrigger: { trigger: row.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
      mm.add("(max-width: 799px)", () => {
        gsap.fromTo(".profile-photo", { xPercent: 50 * dir }, {
          xPercent: 0, ease: "none",
          scrollTrigger: { trigger: row.current, start: "top bottom+=100", end: "bottom bottom", scrub: 0.6 },
        });
      });
    }, row);
    return () => ctx.revert();
  }, [reverse]);

  return (
    <div ref={row} className={`relative z-10 flex w-full flex-col items-center ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
      <div className="profile-photo flex h-[70vh] max-h-[900px] items-center justify-center md:h-screen md:w-1/2">
        <Photo photo={person.photo} className="aspect-[3/4] h-full rounded-2xl shadow-2xl" />
      </div>
      <div
        className={`flex flex-col gap-6 px-8 pt-10 text-center md:w-[420px] md:px-0 ${
          reverse ? "md:-mr-8 md:text-right" : "md:-ml-16 md:text-left"
        }`}
      >
        <h3 className="profile-name font-display text-5xl italic leading-[0.9] mix-blend-difference md:text-7xl lg:text-8xl">
          {family}
          <br />
          {given}
        </h3>
        <div className="profile-bio">
          <p className="text-xs uppercase tracking-[0.3em] text-blush">{person.role}</p>
          <p className="mt-3 text-cream/80">{person.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default function Couple() {
  const root = useRef<HTMLElement>(null);
  const center = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    // Keep the center photo fixed on screen while the profiles scroll over it (desktop only).
    mm.add("(min-width: 800px)", () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        pin: center.current,
        pinSpacing: false,
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="couple" ref={root} className="relative flex min-h-[300vh] w-full flex-col items-center overflow-hidden bg-wine text-cream">
      {/* Soft glows */}
      <div className="pointer-events-none absolute -left-[400px] top-2/3 size-[800px] rounded-full bg-blush/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-[400px] top-1/3 size-[800px] rounded-full bg-blush/20 blur-3xl" />

      <div ref={center} className="relative flex h-screen w-full items-center justify-center">
        <span className="pointer-events-none absolute select-none font-display text-[240px] leading-none text-blush/15 md:text-[320px]">
          囍
        </span>
        <Photo photo={wedding.couplePhoto} className="relative size-[260px] rounded-xl shadow-2xl md:size-[332px]" />
      </div>

      <div className="flex w-full flex-col">
        <Profile person={wedding.groom} />
        <div className="h-[138px]" />
        <Profile person={wedding.bride} reverse />
      </div>
    </section>
  );
}
