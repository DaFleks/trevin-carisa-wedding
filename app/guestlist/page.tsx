import GuestlistTable from "@/components/GuestlistTable";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";
import { UserPlusIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // 👈 always fetch live DB data

const page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const { orderBy, sortBy, filterBy } = await searchParams;
  const guests = await prisma.guest.findMany({ orderBy: { [orderBy as string]: sortBy } });

  return (
    <>
      <h1 className="text-4xl font-bold">{`Carisa & Trevin's Guestlist`}</h1>
      <Button className="w-1/6 ml-auto font-semibold my-8 bg-black" asChild>
        <Link href="/guestlist/add">
          <UserPlusIcon />
          Add a Guest
        </Link>
      </Button>
      <GuestlistTable guests={guests} />
    </>
  );
};

export default page;
