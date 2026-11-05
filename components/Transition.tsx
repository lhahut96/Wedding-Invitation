// Sunlit band between the Hero and Intro photos. The negative margins overlap each photo only a little,
// leaving a cream gap in the middle so the two photos no longer sit right next to each other.
export default function Transition() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-20 -my-[8vh] h-[22vh] w-full md:-my-[10vh] md:h-[26vh]"
    >
      {/* Soft white veil: a slightly darkened cream (cream mixed with a little ink) in the middle, so there is real breathing room between the photos */}
      <div className="absolute inset-0 [--veil:color-mix(in_srgb,var(--color-cream)_88%,var(--color-ink))] bg-[linear-gradient(to_bottom,transparent,var(--veil)_30%,var(--veil)_70%,transparent)]" />
      {/* Warm sun glow, slightly off-center like light coming through leaves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_62%_50%,rgb(255_236_190/0.4),transparent_70%)] mix-blend-screen" />
    </div>
  );
}
