"use client";

import { Mrs_Saint_Delafield } from "next/font/google";
import { ChevronDownIcon } from "lucide-react";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

import trevinImg1 from "@/public/images/Trevin-13.jpg";

const cedarville = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"] });

const HeroSection = () => {
  return (
    <Container
      as="section"
      className="relative h-full bg-cover text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)]"
      style={{ backgroundImage: `url("${trevinImg1.src}")`, backgroundPosition: "67% 100%" }}>
      <Container className="bg-black/40 absolute top-0 left-0 w-full h-full flex flex-col justify-between">
        <Container className="h-1/2 flex items-center">
          <Container className={`relative h-[250px] w-full text-[6rem] ${cedarville.className}`}>
            <h1 className="absolute top-0 sm:top-8 left-1/4 -translate-x-1/4">Trevin</h1>
            <h1 className="absolute top-25 sm:top-40 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[4rem]">&</h1>
            <h1 className="absolute top-34 sm:top-52 right-1/4 translate-x-1/4">Carisa</h1>
          </Container>
        </Container>

        <Container className="h-1/2 space-y-4 text-center flex flex-col justify-end">
          <h1 className={`${cedarville.className} text-[3rem] sm:text-[3rem] h-[60px] overflow-hidden`}>Two Become One</h1>

          <Container className="font-semibold grid grid-cols-3 gap-4 items-center px-12 mb-8">
            <Text className="border-y py-4">SATURDAY</Text>
            <Container>
              <Text>MAY</Text>
              <Text className="text-[2rem] sm:text-[3rem]">16</Text>
              <Text>2026</Text>
            </Container>
            <Text className="border-y py-4">4:00 PM</Text>
          </Container>

          <Container className="text-center0 mb-8">
            <Text className="font-semibold text-xs mb-2">FOLLOW OUR PATH BELOW</Text>
            <ChevronDownIcon className="mx-auto" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
export default HeroSection;
