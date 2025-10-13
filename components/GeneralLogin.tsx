"use client";

import { Tangerine } from "next/font/google";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import Section from "./Section";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import loginBg from "@/public/images/login-background.webp";
import { useState } from "react";
import { useToggle } from "@/hooks/useToggle";
import Loading from "./aetherium/Loading/Loading";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

interface GeneralLoginProps {
  handleIsVerified: () => void;
}

const GeneralLogin = (props: GeneralLoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [emailNotFound, handleEmailNotFound, setEmailNotFound] = useToggle(false);
  const [emailConfirmed, handleEmailConfirmed] = useToggle(false);
  const [isLoading, handleIsLoading] = useToggle(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleIsLoading();
    const response = await fetch("/api/guestlist/verify", { method: "POST", body: JSON.stringify({ email: email }) });
    const data = await response.json();
    handleIsLoading();

    if (data.status === 200) {
      handleEmailConfirmed();
      setTimeout(() => {
        props.handleIsVerified();
      }, 3000);
    } else {
      setEmailNotFound(true);
    }
  };

  const welcomeMessage = emailNotFound ? (
    <>
      We didn’t find that email.
      <br /> Maybe try another one?
    </>
  ) : (
    <>
      Before we roll out the red carpet, <br />
      what’s the email we sent your invite to?
    </>
  );

  return (
    <>
      <Section imageSrc={loginBg.src} imagePosition="43% 50%" className="text-white flex flex-col justify-center text-center gap-8 xl:w-1/4 mx-auto">
        <h1 className={`text-7xl ${tangerine.className}`}>{emailConfirmed ? "Thanks!" : "Welcome!"}</h1>
        <Text className="text-sm">
          {emailConfirmed ? (
            <>
              We’re so happy you’re here — <br />
              let’s get you RSVP’d and ready for the big day.
            </>
          ) : (
            welcomeMessage
          )}
        </Text>
        <Text></Text>
        {!emailConfirmed && (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <Input
              type="email"
              className="bg-white w-full py-6"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <Button variant="outline" className=" w-full py-6 bg-transparent cursor-pointer">
              Submit
            </Button>
          </form>
        )}
      </Section>
      {isLoading && <Loading />}
    </>
  );
};

export default GeneralLogin;
