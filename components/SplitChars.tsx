// Splits text into per-character spans so GSAP can stagger them.
export default function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className={`char inline-block ${className}`}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}
