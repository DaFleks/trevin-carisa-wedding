import { Guest } from "@/app/generated/prisma";
import Container from "@/components/aetherium/Container";
import GuestlistForm from "@/components/GuestlistForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const guest = await prisma.guest.findUnique({ where: { id: id } });

  return (
    <Container className="fixed top-0 left-0 h-full w-full bg-neutral-200 text-black [text-shadow:_0px_0px_0px_rgba(0,0,0,0.5)]">
      <Container className="w-2/3 h-full bg-white border shadow-2xl shadow-neutral-400 mx-auto flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold">{`Editing Guest`}</h1>
        <Container className="h-full">
          <GuestlistForm guest={guest} />
        </Container>
      </Container>
    </Container>
  );
};

export default page;
