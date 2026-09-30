"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "./useReveal";

type Wish = { id: number; name: string; message: string };

const field = "border-b border-ink/30 bg-transparent py-3 outline-none focus:border-ink";
const post = (url: string, body: unknown) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

// One form for RSVP + wishes: saves the RSVP, and the wish too when a message is written.
export default function Wishes() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => (r.ok ? r.json() : []))
      .then(setWishes)
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "");
    const message = String(f.get("message") ?? "").trim();
    setStatus("sending");
    try {
      const res = await post("/api/rsvp", {
        name,
        attending,
        guests: Number(f.get("guests") ?? 1),
        side: f.get("side") || null,
        phone: f.get("phone"),
        note: f.get("note"),
      });
      if (!res.ok) throw new Error();
      if (message) {
        const w = await post("/api/wishes", { name, message });
        if (w.ok) {
          const wish: Wish = await w.json();
          setWishes((prev) => [wish, ...prev]);
        }
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" ref={root} className="px-6 py-24 md:px-16">
      <h2 className="reveal text-center font-display text-5xl md:text-7xl italic">Xác nhận &amp; gửi lời chúc</h2>
      {status === "done" ? (
        <p className="reveal mx-auto mt-12 max-w-xl text-center text-lg">Cảm ơn bạn đã xác nhận và gửi lời chúc! ♡</p>
      ) : (
        <form onSubmit={submit} className="reveal mx-auto mt-12 flex max-w-xl flex-col gap-4">
          <input name="name" required maxLength={100} placeholder="Tên của bạn" className={field} />
          <input name="phone" type="tel" maxLength={30} placeholder="Số điện thoại (không bắt buộc)" className={field} />
          <div className="flex gap-3">
            {[
              [true, "Tôi sẽ tham dự"],
              [false, "Tiếc quá, tôi không đến được"],
            ].map(([v, label]) => (
              <button
                type="button"
                key={String(v)}
                onClick={() => setAttending(v as boolean)}
                className={`flex-1 cursor-pointer rounded-full border px-4 py-3 text-sm transition ${
                  attending === v ? "border-ink bg-ink text-cream" : "border-ink/30"
                }`}
              >
                {label as string}
              </button>
            ))}
          </div>
          {attending && (
            <div className="flex gap-4">
              <select name="side" defaultValue="" className={`${field} flex-1`}>
                <option value="">Khách của...</option>
                <option value="bride">Nhà gái</option>
                <option value="groom">Nhà trai</option>
              </select>
              <input name="guests" type="number" min={1} max={10} defaultValue={1} aria-label="Số người" className={`${field} w-24`} />
            </div>
          )}
          <input name="note" maxLength={500} placeholder="Ghi chú (ăn chay, dị ứng...)" className={field} />
          <textarea name="message" rows={3} maxLength={1000} placeholder="Lời chúc..." className={`${field} resize-none`} />
          {status === "error" && <p className="text-center text-sm text-wine">Không gửi được, vui lòng thử lại.</p>}
          <button
            disabled={status === "sending"}
            className="mt-4 cursor-pointer self-center rounded-full bg-ink px-8 py-3 text-sm text-cream transition hover:bg-wine"
          >
            Gửi
          </button>
        </form>
      )}
      <ul className="mx-auto mt-12 max-w-xl space-y-6">
        {wishes.map((w) => (
          <li key={w.id} className="border-l-2 border-blush pl-4">
            <p className="font-semibold">{w.name}</p>
            <p className="text-ink/70">{w.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
