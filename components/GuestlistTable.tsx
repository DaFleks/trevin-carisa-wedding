"use client";

import { Guest } from "@/lib/generated/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Text from "./aetherium/Text";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "lucide-react";
import Container from "./aetherium/Container";
import DeleteModal from "./DeleteModal";
import { useToggle } from "@/hooks/useToggle";
import { useState } from "react";

interface GuestlistTableProps {
  guests: Guest[];
}

const GuestlistTable = (props: GuestlistTableProps) => {
  const [currentDeleteId, setCurrentDeleteId] = useState<string>("");
  const [isDeleteModalOpen, handleIsDeleteModalOpen] = useToggle(false);
  const router = useRouter();

  const handleDeleteGuest = async (id?: string) => {
    const response = await fetch("/api/guestlist", { method: "DELETE", body: JSON.stringify({ id: currentDeleteId }) });
    const data = await response.json();
    alert(data.message);
    router.refresh();
    handleIsDeleteModalOpen();
  };

  const handleDeleteModalWindow = (id: string) => {
    setCurrentDeleteId(id);
    handleIsDeleteModalOpen();
  };

  return (
    <>
      <Container className="overflow-y-scroll h-[90%] border">
        <Table>
          <TableHeader className="sticky top-0 bg-neutral-600 !text-white">
            <TableRow>
              <TableHead className="font-bold">Guest</TableHead>
              <TableHead className="font-bold text-center">Attending</TableHead>
              <TableHead className="font-bold text-center">Plus One</TableHead>
              <TableHead className="font-bold text-center">Meal Options</TableHead>
              <TableHead className="font-bold">Note</TableHead>
              <TableHead />
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="py-4">
                  <Text className="mb-2 font-semibold">{`${guest.firstName} ${guest.lastName}`}</Text>
                  <Text>{guest.streetAddress}</Text>
                  <Text>
                    {guest.city}, {guest.province}
                  </Text>
                  <Text>{guest.postalCode}</Text>
                  <Text>{guest.phoneNumber}</Text>
                  <Text className="underline">
                    <Link href={`mailto: ${guest.email}`}>{guest.email}</Link>
                  </Text>
                </TableCell>
                <TableCell className="text-center">{guest.isAttending ? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">{guest.isBringingPlusOne ? "Yes" : "No"}</TableCell>
                <TableCell className="text-center">{guest.mealOptions?.replaceAll(",", ", ")}</TableCell>
                <TableCell>{guest.note}</TableCell>
                <TableCell>
                  <Button asChild className="bg-neutral-600 h-10 w-10">
                    <Link href={`/guestlist/${guest.id}`}>
                      <PencilIcon />
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    className="h-10 w-10 cursor-pointer"
                    onClick={() => {
                      handleDeleteModalWindow(guest.id);
                    }}>
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <DeleteModal open={isDeleteModalOpen} handleIsOpen={handleIsDeleteModalOpen} handleDeleteGuest={handleDeleteGuest} />
    </>
  );
};

export default GuestlistTable;
