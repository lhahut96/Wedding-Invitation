"use client";

import { wedding } from "@/content/wedding";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SplitChars from "./SplitChars";

// Size of the centered "window" the photos stack inside before it opens to full screen.
const WIN_W = 320;
const WIN_H = 480;

function windowInset() {
  const x = Math.max(0, (window.innerWidth - WIN_W) / 2);
  const y = Math.max(0, (window.innerHeight - WIN_H) / 2);
  return { x, y };
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lock scrolling while the intro plays (Lenis is created by the parent, so wait a frame).
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => window.__lenis?.stop());
    const unlock = () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      const { x, y } = windowInset();
      const clip = { x, y };
      const applyClip = () => {
        if (stage.current) stage.current.style.clipPath = `inset(${clip.y}px ${clip.x}px ${clip.y}px ${clip.x}px)`;
      };
      applyClip();

      gsap.set(".hero-layer", { y: WIN_H, autoAlpha: 0 });
      gsap.set(".hero-main-img", { scale: 1.2, filter: "blur(8px)" });
      gsap.set(".hero-title .char, .hero-rule, .hero-date", { y: 40, opacity: 0 });
      gsap.set(stage.current, { autoAlpha: 1 });

      const tl = gsap.timeline({ delay: 0.2, onComplete: unlock });

      // 1. Photos rise from below one by one, each covering the previous.
      tl.to(".hero-layer", { y: 0, autoAlpha: 1, duration: 2, ease: "power4.out", stagger: 0.3 })
        // 2. The centered window opens to full screen, overlapping the end of the stack.
        .to(clip, { x: 0, y: 0, duration: 1, ease: "power4.inOut", onUpdate: applyClip }, "-=1")
        // 3. Main photo comes into focus while the names rise in.
        .to(".hero-main-img", { scale: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" })
        .to(".hero-title .char, .hero-rule, .hero-date", { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: "power2.out" }, "<");

      // After the intro: title drifts up as the hero scrolls away.
      gsap.to(".hero-text", {
        y: () => -window.innerHeight * 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.9 },
      });
    }, root);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      unlock();
    };
  }, []);

  const { bride, groom, hero, dateLabel } = wedding;

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-cream">
      <div ref={stage} className="invisible absolute inset-0 z-10 overflow-hidden">
        {hero.frames.map((f, i) => (
          <div
            key={i}
            className="hero-layer absolute left-1/2 top-1/2 h-[480px] w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{ zIndex: i + 1 }}
          >
            <img src={f.src} alt={f.alt} className="object-cover size-full" />
          </div>
        ))}

        {/* Last layer: full-screen main photo, only visible through the window until it opens */}
        <div className="hero-layer absolute inset-0 overflow-hidden bg-ink" style={{ zIndex: hero.frames.length + 1 }}>
          <div className="hero-main-img size-full">
            <img src={hero.main.src} alt={hero.main.alt} className="object-cover size-full opacity-85" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/45" />
        </div>
      </div>

      <div className="hero-text pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center text-cream select-none [text-shadow:0_2px_12px_rgb(0_0_0/0.45)]">
        {/* Mobile: the block is spread over the photo so "Trâm Anh" sits just above the groom's head and
            "Anh Tú" at the bride's neck, with a small "&" between them. */}
        <div className="relative -translate-y-[3vh] md:translate-y-0">
          <h1 className="hero-title flex h-[27vh] flex-col items-center justify-between font-display text-[12vw] leading-none tracking-tight md:h-auto md:justify-center md:gap-2 md:text-[8vw]">
            <span className="block overflow-hidden py-[0.12em] pr-[0.1em] whitespace-nowrap">
              <SplitChars text={bride.name} />
            </span>
            <span className="flex items-center gap-3 text-[5vw] italic text-cream/80 md:text-[3.5vw]">
              <span className="hero-rule h-px w-[9vw] bg-cream/70 md:w-[4vw]" />
              <span className="block overflow-hidden py-[0.12em] pr-[0.1em]">
                <SplitChars text="&" />
              </span>
              <span className="hero-rule h-px w-[9vw] bg-cream/70 md:w-[4vw]" />
            </span>
            <span className="block overflow-hidden py-[0.12em] pr-[0.1em] whitespace-nowrap">
              <SplitChars text={groom.name} />
            </span>
          </h1>
          <p className="hero-date absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-cream/80 md:text-xs">{dateLabel}</p>
        </div>
      </div>
    </section>
  );
}
