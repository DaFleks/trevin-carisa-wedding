"use client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

interface LocationProps {
  name?: string;
  street?: string;
  city?: string;
  phone?: string;
  className?: string;
}

const Location = (props: LocationProps) => {
  return (
    <Container className={props.className}>
      <h1 className={`text-5xl mb-4 tangerine_26246154-module__d4xTbq__className`}>{props.name}</h1>
      <Text className="text-sm">{props.street}</Text>
      <Text className="text-sm">{props.city}</Text>
      <Text className="text-sm">{props.phone}</Text>
    </Container>
  );
};

export default Location;
