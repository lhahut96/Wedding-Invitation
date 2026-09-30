"use client";

import { useEffect, useState } from "react";

const UNITS = ["Ngày", "Giờ", "Phút", "Giây"];

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [
    Math.floor(ms / 86_400_000),
    Math.floor(ms / 3_600_000) % 24,
    Math.floor(ms / 60_000) % 60,
    Math.floor(ms / 1000) % 60,
  ];
}

export default function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  // null until mounted, so server and client render the same markup
  const [left, setLeft] = useState<number[] | null>(null);

  useEffect(() => {
    setLeft(diff(target));
    const id = setInterval(() => setLeft(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex justify-center gap-6 md:gap-12">
      {UNITS.map((label, i) => (
        <div key={label} className="text-center">
          <p className="font-display text-5xl md:text-7xl tabular-nums">
            {left ? String(left[i]).padStart(2, "0") : "--"}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-cream/60">{label}</p>
        </div>
      ))}
    </div>
  );
}
