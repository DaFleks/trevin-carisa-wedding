import Container from "@/components/aetherium/Container";
import GuestlistForm from "@/components/GuestlistForm";

const page = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">{`Add a Guest`}</h1>
      <GuestlistForm />
    </>
  );
};

export default page;
