"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultPhotoVersion, photoSets, type PhotoVersion } from "@/content/wedding";

const STORAGE_KEY = "photo-version";
const Ctx = createContext<{ version: PhotoVersion; photos: (typeof photoSets)[PhotoVersion]; toggle: () => void }>({
  version: defaultPhotoVersion,
  photos: photoSets[defaultPhotoVersion],
  toggle: () => {},
});

export const usePhotoVersion = () => useContext(Ctx);

export function PhotoVersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<PhotoVersion>(defaultPhotoVersion);

  // Restore the last pick after hydration so server and client markup match.
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (saved === 1 || saved === 2) setVersion(saved);
    } catch {}
  }, []);

  const toggle = () =>
    setVersion((v) => {
      const next: PhotoVersion = v === 1 ? 2 : 1;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      return next;
    });

  return <Ctx.Provider value={{ version, photos: photoSets[version], toggle }}>{children}</Ctx.Provider>;
}

// Floating button to flip the hero/groom/bride photos between the two design versions.
export function PhotoVersionSwitch() {
  const { version, toggle } = usePhotoVersion();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-20 right-4 z-50 cursor-pointer rounded-full bg-ink/80 px-4 py-2 text-xs font-semibold text-cream shadow-lg backdrop-blur transition hover:bg-ink md:bottom-6 md:right-6"
    >
      Version {version} → {version === 1 ? 2 : 1}
    </button>
  );
}
