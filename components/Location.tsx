"use client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

import { useWeddingContext } from "./WeddingProvider";

interface LocationProps {
  name?: string;
  street?: string;
  city?: string;
  phone?: string;
  className?: string;
}

const Location = (props: LocationProps) => {
  const { tangerineFont } = useWeddingContext();

  return (
    <Container className={props.className}>
      <h2 className={`text-5xl mb-4 ${tangerineFont}`}>{props.name}</h2>
      <Text className="text-sm">{props.street}</Text>
      <Text className="text-sm">{props.city}</Text>
      <Text className="text-sm">{props.phone}</Text>
    </Container>
  );
};

export default Location;
