"use client";

import { useState } from "react";
import { Tangerine } from "next/font/google";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import Text from "./aetherium/Text";
import Loading from "./aetherium/Loading/Loading";
import Section from "./Section";
import { useToggle } from "@/hooks/useToggle";
import { fetchWithLoading } from "@/lib/utils";
import loginBg from "@/public/images/login-background.webp";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

interface VerificationGateProps {
  handleIsVerified: () => void;
}

const VerificationGate = (props: VerificationGateProps) => {
  //  Hooks
  const [email, setEmail] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>(`Before we roll out the red carpet,\nwhat’s the email we sent your invite to?`);
  const [isLoading, handleIsLoading] = useToggle(false);

  //  Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await fetchWithLoading(handleIsLoading, "/api/guestlist/verify", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });

    if (data.status === 200) {
      setFormMessage("We’re so happy you’re here —\nlet’s get you RSVP’d and ready for the big day.");
      setTimeout(() => {
        props.handleIsVerified();
      }, 3000);
    } else {
      setFormMessage("Bummer, we didn’t find that email.\nMaybe try another one?");
    }
  };

  return (
    <Section
      imageSrc={loginBg.src}
      imagePosition="48% 50%"
      className="text-white flex flex-col justify-center text-center gap-8 xl:w-1/4 mx-auto">
      <h1 className={`text-7xl ${tangerine.className}`}>{formMessage[0] === "B" ? "Welcome!" : "Thanks!"}</h1>

      <Text className="text-sm whitespace-pre-line">{formMessage}</Text>

      {formMessage[0] === "B" && (
        <form className="space-y-8" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button variant="outline">Submit</Button>
        </form>
      )}
      {isLoading && <Loading />}
    </Section>
  );
};

export default VerificationGate;
