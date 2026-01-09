import { MailIcon } from "lucide-react";

import Container from "@/components/aetherium/Container";
import InvitationFormUpdate from "@/components/invitations/InvitationFormUpdate";

import prisma from "@/lib/prisma";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const invitation = await prisma.invitation.findFirst({ where: { id: id }, include: { guests: { orderBy: { name: "asc" } } } });

  return (
    <>
      <Container className="flex items-center gap-2">
        <MailIcon className="mt-0.5" />
        <h1 className="text-2xl font-medium">{invitation?.title}</h1>
      </Container>
      {invitation && <InvitationFormUpdate invitation={invitation} />}
    </>
  );
};

export default page;
