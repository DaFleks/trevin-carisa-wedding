"use client";

import Container from "./aetherium/Container";
import Text from "./aetherium/Text";

interface TimestampProps {
  title?: string;
  children?: React.ReactNode;
  fontClassName: string;
}

const Timestamp = (props: TimestampProps) => {
  return (
    <Container className="space-y-4">
      <h3 className={`text-5xl ${props.fontClassName}`}>{props.title}</h3>
      <Text className="text-sm">{props.children}</Text>
    </Container>
  );
};

export default Timestamp;
