import SmoothScroll from "@/components/SmoothScroll";
import CornerNav from "@/components/CornerNav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Couple from "@/components/Couple";
import Gallery from "@/components/Gallery";
import Schedule from "@/components/Schedule";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import { PhotoVersionProvider, PhotoVersionSwitch } from "@/components/PhotoVersion";

export default function Home() {
  return (
    <PhotoVersionProvider>
    <SmoothScroll>
      <CornerNav />
      <PhotoVersionSwitch />
      <main>
        <Hero />
        <Intro />
        <Couple />
        <Schedule />
        <Wishes />
        <Gallery />
        <Footer />
      </main>
    </SmoothScroll>
    </PhotoVersionProvider>
  );
}
