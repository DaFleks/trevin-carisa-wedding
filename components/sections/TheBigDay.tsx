"use client";

import Text from "../aetherium/Text";

import Category from "../Category";
import Location from "../Location";
import Section from "../Section";

import ScrollDownIcon from "../ScrollDownIcon";

import { useWeddingContext } from "../WeddingProvider";
import { Button } from "../ui/button";

import categoryTwo from "@/public/images/category-2.webp";
import sectionTwo from "@/public/images/section-2.webp";
import RSVPModal from "../RSVPModal";
import { useToggle } from "@/hooks/useToggle";

const TheBigDay = () => {
  const { tangerineFont } = useWeddingContext();
  const [isRsvpOpen, toggleIsRsvpOpen] = useToggle(false);

  return (
    <>
      <Category title="The Big Day" imageSrc={categoryTwo.src} imagePosition="100% 50%">
        Everything you need to know for the day we say “I do.”
      </Category>

      <Section imageSrc={sectionTwo.src} imagePosition="45% 100%" className="text-center pt-36 pb-12">
        <Text className="text-sm mb-8 font-bold">BOTH THE CEREMONY & RECEPTION WILL TAKE PLACE AT:</Text>
        <Location className="mb-16" name="Ascott Parc Event Centre" street="2839 RUTHERFORD ROAD" city="VAUGHAN, ON" />

        <Text className="text-sm mb-8 font-bold">OUR CEREMONY WILL BE HELD AT:</Text>
        <h2 className={`text-5xl mb-4 ${tangerineFont}`}>The Garden Gazebo</h2>
        <h3 className="text-xl mb-16 font-semibold">AT 4:00 PM</h3>

        <Text className="text-sm mb-8 font-bold">FOLLOWED BY COCKTAIL HOUR AND DINNER AT:</Text>
        <h2 className={`text-5xl mb-16 ${tangerineFont}`}>The Trillium Hall</h2>

        <Button variant="outline" className="mb-4 md:w-1/4 mx-auto" onClick={toggleIsRsvpOpen}>
          RSVP NOW
        </Button>
        <Text className="text-xs mb-42">
          RSVPs open until <b>January 16, 2026</b>
        </Text>
        <ScrollDownIcon text="ACCOMODATIONS" />
      </Section>
      {isRsvpOpen && <RSVPModal toggleIsRsvpOpen={toggleIsRsvpOpen} />}
    </>
  );
};

export default TheBigDay;
