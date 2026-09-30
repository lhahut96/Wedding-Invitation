import type { Photo as PhotoT } from "@/content/wedding";

const TINTS = [
  "linear-gradient(135deg, #e8c4b8, #f3e3d3 45%, #cdb8a6)",
  "linear-gradient(160deg, #d9b8a0, #efe0cf 50%, #b99a86)",
  "linear-gradient(120deg, #c9a9a6, #f1dcd6 50%, #a88684)",
  "linear-gradient(145deg, #bfc6b0, #e9eadc 50%, #9ea58c)",
  "linear-gradient(130deg, #b9aec4, #e7e1ee 50%, #948aa1)",
];

// Stable tint per placeholder so stacked placeholders are distinguishable.
function tint(key: string) {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

// Renders the photo if `src` is set, otherwise a gradient placeholder labelled with the alt text.
export default function Photo({ photo, className = "" }: { photo: PhotoT; className?: string }) {
  if (photo.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo.src} alt={photo.alt} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ background: tint(photo.alt) }}>
      <span className="font-display italic text-ink/40 text-sm">{photo.alt}</span>
    </div>
  );
}
