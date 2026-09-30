import { wedding } from "@/content/wedding";

export default function Footer() {
  return (
    <footer className="flex min-h-[60vh] flex-col items-center justify-center bg-ink px-6 py-24 text-center text-cream">
      <p className="font-display text-[14vw] md:text-[8vw] italic leading-none">
        {wedding.bride.name} & {wedding.groom.name}
      </p>
      <p className="mt-8 text-cream/60">{wedding.thanks}</p>
    </footer>
  );
}
