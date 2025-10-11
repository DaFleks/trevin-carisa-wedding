import Container from "@/components/aetherium/Container";
import GuestlistForm from "@/components/GuestlistForm";

const page = () => {
  return (
    <Container className="fixed top-0 left-0 h-full w-full bg-neutral-200 text-black [text-shadow:_0px_0px_0px_rgba(0,0,0,0.5)]">
      <Container className="w-2/3 h-full border bg-white shadow-2xl shadow-neutral-400 mx-auto flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold">{`Add a Guest`}</h1>
        <GuestlistForm />
      </Container>
    </Container>
  );
};

export default page;
