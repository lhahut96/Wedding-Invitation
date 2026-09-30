"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";

// Where each photo sits around the center (in vw / vh) as it flies toward the viewer.
const SPOTS = [
  { x: -26, y: -18 }, { x: 24, y: 14 }, { x: -20, y: 22 }, { x: 28, y: -20 }, { x: 0, y: -26 },
  { x: -30, y: 4 }, { x: 22, y: -4 }, { x: -8, y: 26 }, { x: 10, y: -12 },
];

// 3D fly-through: photos appear far away one by one and rush past the camera as you scroll.
export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const photos = wedding.gallery;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".fly-item");
      gsap.set(items, { z: -2400, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${items.length * 50}%`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onEnter: () => popLabel(),
          onEnterBack: () => popLabel(),
        },
      });

      items.forEach((el, i) => {
        const at = i * 0.6;
        tl.to(el, { opacity: 1, duration: 0.4, ease: "none" }, at)
          .to(el, { z: 900, duration: 4, ease: "power1.in" }, at)
          .to(el, { opacity: 0, duration: 0.6, ease: "none" }, at + 3.4);
      });

      function popLabel() {
        gsap.fromTo(".fly-label", { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen w-full overflow-hidden bg-ink" style={{ perspective: "1000px" }}>
      <div className="fly-label pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center text-cream">
        <h2 className="font-display text-6xl italic md:text-8xl">{wedding.galleryLabel.title}</h2>
        <p className="mt-4 tracking-[0.4em] text-blush">{wedding.galleryLabel.years}</p>
      </div>

      {photos.map((p, i) => {
        const s = SPOTS[i % SPOTS.length];
        return (
          <div
            key={i}
            className="fly-item absolute left-1/2 top-1/2 z-10 w-[40vw] md:w-[20vw]"
            style={{ marginLeft: `${s.x}vw`, marginTop: `${s.y}vh`, translate: "-50% -50%" }}
          >
            <Photo photo={p} className="aspect-[3/4] w-full rounded-sm shadow-2xl" />
          </div>
        );
      })}
    </section>
  );
}
