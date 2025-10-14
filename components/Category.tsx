"use client";

import Container from "./aetherium/Container";
import OverlayContainer from "./OverlayContainer";
import { useWeddingContext } from "./WeddingProvider";

interface CategoryProps {
  imageSrc: string;
  imagePosition: string;
  title?: string;
  children?: React.ReactNode;
}

const Category = (props: CategoryProps) => {
  const { tangerineFont } = useWeddingContext();
  return (
    <Container
      className="relative h-1/2 overflow-y-hidden bg-fixed"
      style={{ backgroundImage: `url("${props.imageSrc}")`, backgroundPosition: props.imagePosition, backgroundSize: "cover" }}>
      <OverlayContainer className="h-full p-8 flex flex-col justify-center">
        <h2 className={`text-6xl ${tangerineFont}`}>{props.title}</h2>
        <Container className="!h-[1px] bg-gradient-to-r from-white/50 to-transparent w-full mt-4 mb-4" />
        <Container className="text-sm mb-0 font-normal">{props.children}</Container>
      </OverlayContainer>
    </Container>
  );
};

export default Category;
