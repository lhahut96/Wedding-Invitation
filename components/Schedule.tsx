"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";
import Countdown from "./Countdown";
import Photo from "./Photo";

// Full-screen event slides that stack: each one holds still while the next covers it,
// a progress bar fills along the bottom, and the last one shrinks into a card on the way out.
export default function Schedule() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".schedule-head > *", {
        y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".schedule-head", start: "top 70%" },
      });

      const slides = gsap.utils.toArray<HTMLElement>(".slide");
      slides.forEach((slide, i) => {
        const bg = slide.querySelector(".slide-bg");
        const bar = slide.querySelector(".slide-progress");
        const isLast = i === slides.length - 1;

        gsap.from(slide.querySelector(".slide-content"), {
          yPercent: 30, opacity: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: slide, start: "top 60%", toggleActions: "play none none reverse" },
        });

        if (!isLast) {
          ScrollTrigger.create({
            trigger: slide,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              gsap.set(bar, { width: `${self.progress * 100}%` });
              gsap.set(bg, { scale: 1.1 - 0.1 * self.progress });
            },
          });
        } else {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: slide,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: true,
                onUpdate: (self) => gsap.set(bar, { width: `${self.progress * 100}%` }),
              },
            })
            .to(slide, { scale: 0.75, borderRadius: 48, ease: "none" });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={root} className="relative bg-ink text-cream">
      <div className="schedule-head flex min-h-screen flex-col items-center justify-center bg-wine px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-blush">Lịch trình</p>
        <h2 className="mt-4 font-display text-5xl italic md:text-8xl">Ngày chung đôi</h2>
        <p className="mt-6 tracking-[0.4em]">{wedding.dateLabel}</p>
        <div className="mt-16">
          <Countdown date={wedding.date} />
        </div>
      </div>

      {wedding.events.map((e, i) => (
        <article key={e.title} className="slide relative h-screen w-full overflow-hidden bg-ink" style={{ zIndex: i + 1 }}>
          <div className="slide-bg absolute inset-0 scale-110">
            <Photo photo={e.photo} className="size-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          <div className="slide-content absolute inset-x-0 bottom-0 px-6 pb-20 md:px-16 md:pb-24">
            <p className="text-xs uppercase tracking-[0.3em] text-blush">
              {String(i + 1).padStart(2, "0")} / {String(wedding.events.length).padStart(2, "0")} · {e.time}
            </p>
            <h3 className="mt-3 font-display text-5xl italic md:text-8xl">{e.title}</h3>
            <p className="mt-6 text-lg font-semibold">{e.place}</p>
            <p className="text-cream/70">{e.address}</p>
            <a
              href={e.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block border-b border-cream/60 pb-0.5 text-sm hover:border-cream"
            >
              Xem bản đồ →
            </a>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1 bg-cream/15">
            <div className="slide-progress h-full w-0 bg-blush" />
          </div>
        </article>
      ))}
    </section>
  );
}
