"use client";

import { useRef, useState } from "react";
import { wedding } from "@/content/wedding";

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const { title, artist, src } = wedding.music;

  const toggle = () => {
    const a = audio.current;
    if (!a || !src) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="music" className="flex min-h-[80vh] flex-col items-center justify-center gap-10 bg-blush/40 px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-wine">Nghe nhạc</p>
      <button
        onClick={toggle}
        aria-label={playing ? "Tạm dừng" : "Phát nhạc"}
        className={`relative size-56 md:size-72 cursor-pointer rounded-full shadow-2xl ${playing ? "animate-spin-slow" : ""}`}
        style={{ backgroundImage: "repeating-radial-gradient(circle, #1c1917 0 3px, #2a2522 3px 5px)" }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wine text-2xl text-cream">
          {playing ? "❚❚" : "▶"}
        </span>
      </button>
      <div>
        <h3 className="font-display text-3xl italic">{title}</h3>
        <p className="mt-1 text-ink/60">{artist}</p>
        {!src && <p className="mt-4 text-xs text-ink/40">(Thêm file nhạc vào content/wedding.ts → music.src)</p>}
      </div>
      {src && <audio ref={audio} src={src} loop />}
    </section>
  );
}
