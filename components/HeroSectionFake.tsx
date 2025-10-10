"use client";

import { Mrs_Saint_Delafield } from "next/font/google";
import { ChevronDownIcon } from "lucide-react";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

import trevinImg1 from "@/public/images/Trevin-13.jpg";
import Image from "next/image";

import { motion, useAnimation } from "motion/react";
import Intro from "./Intro";
import { useEffect } from "react";
import { wait } from "@/lib/utils";
import { useToggle } from "@/hooks/useToggle";

const cedarville = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"] });

const HeroSectionFake = () => {
  return (
    <>
      <Container as="section" className="z-40 relative h-full bg-cover text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)]">
        <Image src={trevinImg1.src} alt="" fill objectFit="cover" objectPosition="67% 100%" quality={70} />
        <Container className="bg-black/40 absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          <Container className="h-1/2 flex items-center">
            <Container className={`relative h-[250px] w-full text-[6rem] ${cedarville.className}`}>
              <motion.h1 className="absolute top-0 sm:top-8 left-1/4 -translate-x-1/4">
                Trevin
              </motion.h1>
              <motion.h1
              
                className="absolute top-25 sm:top-40 left-1/2 -translate-x-1/2 text-[3rem] sm:text-[4rem]">
                &
              </motion.h1>
              <motion.h1 className="absolute top-34 sm:top-52 right-1/4 translate-x-1/4">
                Carisa
              </motion.h1>
            </Container>
          </Container>

          <Container className="h-1/2 space-y-4 text-center flex flex-col justify-end">
            <motion.h1
            
              className={`${cedarville.className} text-[3rem] sm:text-[3rem] h-[60px] overflow-hidden`}>
              Two Become One
            </motion.h1>

            <motion.div className="font-semibold grid grid-cols-3 gap-4 items-center px-12 mb-8">
              <Text className="border-y py-4">SATURDAY</Text>
              <Container>
                <Text>MAY</Text>
                <Text className="text-[2.5rem]">16</Text>
                <Text>2026</Text>
              </Container>
              <Text className="border-y py-4">4:00 PM</Text>
            </motion.div>

            <motion.div className="text-center  mb-8">
              <Text className="font-semibold text-xs mb-2">FOLLOW OUR PATH BELOW</Text>
              <motion.div
                className="mx-auto w-fit"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}>
                <ChevronDownIcon />
              </motion.div>
            </motion.div>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default HeroSectionFake;
