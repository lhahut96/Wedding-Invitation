import SmoothScroll from "@/components/SmoothScroll";
import CornerNav from "@/components/CornerNav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Couple from "@/components/Couple";
import Gallery from "@/components/Gallery";
import Schedule from "@/components/Schedule";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CornerNav />
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
  );
}
