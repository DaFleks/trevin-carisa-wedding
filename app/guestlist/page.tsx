import Container from "@/components/aetherium/Container";
import Text from "@/components/aetherium/Text";
import GuestlistTable from "@/components/GuestlistTable";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";
import { UserPlusIcon } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const guests = await prisma.guest.findMany({ orderBy: { firstName: "asc" } });

  return (
    <Container className="fixed top-0 left-0 h-full w-full bg-neutral-200 text-black [text-shadow:_0px_0px_0px_rgba(0,0,0,0.5)]">
      <Container className="w-2/3 h-full border bg-white shadow-2xl shadow-neutral-400 mx-auto flex flex-col justify-center p-8">
        <h1 className="text-4xl font-bold">{`Carisa & Trevin's Guestlist`}</h1>
        <Button className="w-1/4 ml-auto font-semibold my-8 py-6 bg-neutral-600" asChild>
          <Link href="/guestlist/add">
            <UserPlusIcon />
            Add a Guest
          </Link>
        </Button>
        <GuestlistTable guests={guests} />
      </Container>
    </Container>
  );
};

export default page;
