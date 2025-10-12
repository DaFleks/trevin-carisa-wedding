import Container from "@/components/aetherium/Container";
import GuestlistForm from "@/components/GuestlistForm";
import prisma from "@/lib/prisma";

export const revalidate = 0; // 👈 always fetch live DB data

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const guest = await prisma.guest.findUnique({ where: { id: id } });

  return (
    <>
      <GuestlistForm guest={guest} />
    </>
  );
};

export default page;
