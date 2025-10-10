"use client";

import Container from "@/components/aetherium/Container";
import Text from "@/components/aetherium/Text";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tangerine } from "next/font/google";
import loginBg from "@/public/images/login-background.webp";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

const page = () => {
  return (
    <Section imageSrc={loginBg.src} imagePosition="43% 50%">
      <Container className="flex flex-col justify-center gap-8 text-center">
        <h1 className={`text-7xl  ${tangerine.className}`}>Welcome!</h1>
        <Text className="text-sm">
          Before we roll out the red carpet, <br />
          what’s the email we sent your invite to?
        </Text>
        <Input type="email" className="bg-white w-full py-6" placeholder="Email" />
        <Button variant="outline" className=" w-full py-6 bg-transparent cursor-pointer">
          Submit
        </Button>
      </Container>
    </Section>
  );
};

export default page;
