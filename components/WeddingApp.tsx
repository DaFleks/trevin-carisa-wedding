"use client";

import { Montserrat, Tangerine } from "next/font/google";

import Container from "./aetherium/Container";

import HeroSection from "@/components/sections/HeroSection";
import OurStory from "./sections/OurStory";
import TheBigDay from "./sections/TheBigDay";
import Accomodations from "./sections/Accomodations";
import Footer from "./sections/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
});


const WeddingApp = () => {
  return (
    <Container
      className={`${montserrat.className} text-white h-full overflow-y-scroll border-4 border-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)]
      xl:w-1/3 xl:mx-auto xl:border-0 xl:shadow-lg xl:shadow-black`}>
      <HeroSection />
      <OurStory />
      <TheBigDay />
      <Accomodations />
      <Footer />
    </Container>
  );
};

export default WeddingApp;
