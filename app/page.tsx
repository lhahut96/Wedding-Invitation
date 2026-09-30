import SmoothScroll from "@/components/SmoothScroll";
import CornerNav from "@/components/CornerNav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Couple from "@/components/Couple";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import MusicPlayer from "@/components/MusicPlayer";
import Schedule from "@/components/Schedule";
import Rsvp from "@/components/Rsvp";
import Wishes from "@/components/Wishes";
import Gift from "@/components/Gift";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CornerNav />
      <main>
        <Hero />
        <Intro />
        <Couple />
        <Story />
        <Gallery />
        <MusicPlayer />
        <Schedule />
        <Rsvp />
        <Wishes />
        <Gift />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
