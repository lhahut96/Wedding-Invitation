"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "./useReveal";

type Wish = { name: string; message: string; at: number };
const KEY = "wedding-wishes";

// Wishes are stored in the visitor's own browser only.
// To collect them for real, replace `save` with a call to a backend (Google Sheets, Supabase, Firebase...).
export default function Wishes() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      setWishes(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    } catch {}
  }, []);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next = [{ name: name.trim(), message: message.trim(), at: Date.now() }, ...wishes];
    setWishes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setName("");
    setMessage("");
  };

  return (
    <section ref={root} className="px-6 py-24 md:px-16">
      <h2 className="reveal text-center font-display text-5xl md:text-7xl italic">Gửi lời chúc</h2>
      <form onSubmit={save} className="reveal mx-auto mt-12 flex max-w-xl flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
          className="border-b border-ink/30 bg-transparent py-3 outline-none focus:border-ink"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Lời chúc..."
          rows={3}
          className="resize-none border-b border-ink/30 bg-transparent py-3 outline-none focus:border-ink"
        />
        <button className="mt-4 self-center cursor-pointer rounded-full bg-ink px-8 py-3 text-sm text-cream transition hover:bg-wine">
          Gửi lời chúc
        </button>
      </form>
      <ul className="mx-auto mt-12 max-w-xl space-y-6">
        {wishes.map((w) => (
          <li key={w.at} className="border-l-2 border-blush pl-4">
            <p className="font-semibold">{w.name}</p>
            <p className="text-ink/70">{w.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
