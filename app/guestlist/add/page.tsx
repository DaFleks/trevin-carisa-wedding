import Container from "@/components/aetherium/Container";
import GuestlistForm from "@/components/GuestlistForm";

export const revalidate = 0; // 👈 always fetch live DB data


const page = () => {
  return (
    <>
      <GuestlistForm />
    </>
  );
};

export default page;
