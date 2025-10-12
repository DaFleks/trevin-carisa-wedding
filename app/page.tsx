import Link from "next/link";
import { Montserrat, Tangerine } from "next/font/google";

import Container from "@/components/aetherium/Container";
import Text from "@/components/aetherium/Text";

import Timestamp from "@/components/Timestamp";
import ScrollDownIcon from "@/components/ScrollDownIcon";
import HeroSection from "@/components/HeroSection";
import Category from "@/components/Category";
import Section from "@/components/Section";

import categoryOne from "@/public/images/category-1.webp";
import categoryTwo from "@/public/images/category-2.webp";
import categoryThree from "@/public/images/category-3.webp";
import sectionOne from "@/public/images/section-1.webp";
import sectionTwo from "@/public/images/section-2.webp";
import sectionThree from "@/public/images/section-3.webp";
import Location from "@/components/Location";

const tangerine = Tangerine({ weight: ["400", "700"], subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Container
      className={`${montserrat.className} overflow-y-scroll h-full border-4 border-white  xl:w-1/3 xl:mx-auto xl:border-0 xl:shadow-lg xl:shadow-black text-white [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)]`}>
      {/* INTRO AND HERO SECTION */}
      <HeroSection />

      {/* OUR STORY */}
      <Category title="Our Story So Far" imageSrc={categoryOne.src} imagePosition="47%" fontClassName={tangerine.className}>
        <Text className="italic mb-4">
          “So they are no longer two, but one flesh.
          <br />
          Therefore what God has joined together,
          <br />
          let no man separate.”
        </Text>
        <Text className="italic font-semibold">— Matthew 19:6 (KJV)</Text>
      </Category>

      <Section imageSrc={sectionOne.src} imagePosition="100% 100%">
        <Container className="space-y-8 mb-48">
          <h2 className={`text-6xl text-center ${tangerine.className}`}>The Timeline</h2>
          <Timestamp title="2008 — Growing Together" fontClassName={tangerine.className}>
            Trevin and Carisa met in grade 10 marketing class at Woburn Collegiate, where they formed a band called The Playmakers. Their
            friendship grew through countless jams and a school talent show, though Trevin secretly kept his crush to himself.
          </Timestamp>
          <Timestamp title="2017 — The Adventures" fontClassName={tangerine.className}>
            While still best friends, Trevin often picked Carisa up from work with her favorite treats. One night at Canoe, he gave her 11
            white roses and one artificial one, saying, “I’ll love you until the last one dies.” Carisa laughed in surprise, realizing they
            shared the same feelings.
          </Timestamp>
          <Timestamp title="2024 — The Proposal" fontClassName={tangerine.className}>
            On April 2, 2024, Trevin took Carisa to her favorite place, surrounded by the animals she loves. As she prepared to sing while
            he played guitar—just like old times—he got down on one knee and asked her to be his wife.
          </Timestamp>
        </Container>
        <ScrollDownIcon text="THE BIG DAY" />
      </Section>

      {/* THE BIG DAY */}
      <Category title="The Big Day" imageSrc={categoryTwo.src} imagePosition="100% 50%" fontClassName={tangerine.className}>
        Everything you need to know for the day we say “I do.”
      </Category>

      <Section imageSrc={sectionTwo.src} imagePosition="45% 100%" className="text-center pt-36 pb-12">
        <Text className="text-sm mb-8 font-bold">BOTH THE CEREMONY & RECEPTION WILL TAKE PLACE AT:</Text>
        <Location className="mb-16" name="Ascott Parc Event Centre" street="2839 RUTHERFORD ROAD" city="VAUGHAN, ON" />

        <Text className="text-sm mb-8 font-bold">OUR CEREMONY WILL BE HELD AT:</Text>
        <h1 className={`text-5xl mb-4 ${tangerine.className}`}>The Garden Gazebo</h1>
        <h3 className="text-xl mb-16 font-semibold">AT 4:00 PM</h3>

        <Text className="text-sm mb-8 font-bold">FOLLOWED BY COCKTAIL HOUR AND DINNER AT:</Text>
        <h1 className={`text-5xl mb-16 ${tangerine.className}`}>The Trillium Hall</h1>

        <button className="border px-8 py-4 mb-4 w-full font-bold hover:bg-neutral-900 hover:text-white duration-100 cursor-pointer mn">
          RSVP NOW
        </button>
        <Text className="text-xs mb-42">
          RSVPs open until <b>January 16, 2026</b>
        </Text>
        <ScrollDownIcon text="ACCOMODATIONS" />
      </Section>

      {/* ACCOMODATIONS */}
      <Category title="Accomodations" imageSrc={categoryThree.src} imagePosition="70% 50%" fontClassName={tangerine.className}>
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

      <Container
        as="footer"
        className="text-center text-xs text-neutral-500 border-t border-neutral-800 py-4 space-y-2 bg-neutral-900 flex flex-col justify-center ">
        <Text>© 2025 Trevin & Carisa</Text>
        <Text>
          Site by&#160;
          <Link href="mailto:petropoulosalex@gmail.com" className="underline">
            Alex Petropoulos
          </Link>
          &#160;of 101Creatives
        </Text>
      </Container>
    </Container>
  );
}
