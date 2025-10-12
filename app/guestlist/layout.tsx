import Container from "@/components/aetherium/Container";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container className={`${geist.className} bg-neutral-100 h-full w-full text-black [text-shadow:_0px_0px_0px_rgba(0,0,0,0.5)]`}>
      <Container className="w-2/3 h-full mx-auto flex flex-col justify-center p-8">{children}</Container>
    </Container>
  );
};

export default layout;
