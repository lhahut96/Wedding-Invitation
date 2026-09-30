"use client";

import { useRef, useState } from "react";
import { wedding } from "@/content/wedding";
import Photo from "./Photo";
import { useReveal } from "./useReveal";

export default function Gift() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopied(num);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  return (
    <section ref={root} className="bg-blush/30 px-6 py-24 md:px-16">
      <h2 className="reveal text-center font-display text-5xl md:text-7xl italic">Mừng cưới</h2>
      <p className="reveal mx-auto mt-6 max-w-lg text-center text-ink/70">{wedding.gift.note}</p>
      <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
        {wedding.gift.accounts.map((a) => (
          <article key={a.number} className="reveal rounded-sm bg-cream p-8 text-center shadow-sm">
            <Photo photo={a.qr} className="mx-auto aspect-square w-40 rounded-sm" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-wine">{a.bank}</p>
            <p className="mt-2 font-semibold">{a.owner}</p>
            <button onClick={() => copy(a.number)} className="mt-2 cursor-pointer font-mono text-lg hover:text-wine">
              {a.number} <span className="text-xs text-ink/50">{copied === a.number ? "✓ đã chép" : "(chép)"}</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
