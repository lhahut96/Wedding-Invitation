"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Fades/slides up every `.reveal` element inside `ref` as it enters the viewport.
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".reveal", { opacity: 0, y: 40 });
      ScrollTrigger.batch(".reveal", {
        start: "top 85%",
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }),
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
