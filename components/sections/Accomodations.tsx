"use client";

import Text from "../aetherium/Text";

import Category from "../Category";
import Location from "../Location";
import Section from "../Section";

import categoryThree from "@/public/images/category-3.webp";
import sectionThree from "@/public/images/section-3.webp";

const Accomodations = () => {
  return (
    <>
      <Category title="Accomodations" imageSrc={categoryThree.src} imagePosition="70% 50%">
        Love, laughter, and a comfy bed — all nearby
      </Category>

      <Section imageSrc={sectionThree.src} imagePosition="58% 50%" className="text-center">
        <Text className="text-sm mb-8 font-bold">HOTEL RECOMMENDATIONS NEARBY</Text>

        <Location className="mb-8" name="Springhill Suites" street="612 APPLEWOOD CRESCENT" city="VAUGHAN, ON" phone="1 (888) 613 7053" />
        <Location
          className="mb-8"
          name="Novotel Toronto Vaughan"
          street="200 BASS PRO MILLS DRIVE"
          city="VAUGHAN, ON"
          phone="1 (888) 660 0212"
        />
        <Location name="Courtyard By Marriott" street="150 INTERCHANGE WAY" city="VAUGHAN, ON" phone="1 (888) 660 9938" />
      </Section>
    </>
  );
};
export default Accomodations;
