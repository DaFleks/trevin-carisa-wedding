"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Text from "./aetherium/Text";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "lucide-react";
import Container from "./aetherium/Container";
import DeleteModal from "./DeleteModal";
import { useToggle } from "@/hooks/useToggle";
import { useState } from "react";
import { Guest } from "@prisma/client";
import Loading from "./aetherium/Loading/Loading";

interface GuestlistTableProps {
  guests: Guest[];
}

const GuestlistTable = (props: GuestlistTableProps) => {
  const [currentDeleteId, setCurrentDeleteId] = useState<string>("");
  const [isDeleteModalOpen, handleIsDeleteModalOpen] = useToggle(false);
  const [isLoading, handleIsLoading] = useToggle(false);
  const router = useRouter();

  const handleDeleteGuest = async () => {
    handleIsLoading();
    const response = await fetch("/api/guestlist", { method: "DELETE", body: JSON.stringify({ id: currentDeleteId }) });
    const data = await response.json();
    handleIsLoading();
    handleIsDeleteModalOpen();
    alert("User Deleted!");
    router.refresh();
  };

  const handleDeleteModalWindow = (id: string) => {
    setCurrentDeleteId(id);
    handleIsDeleteModalOpen();
  };

  return (
    <>
      <Container className="overflow-y-auto h-[90%] bg-white border rounded-lg p-4">
        <Table>
          <TableCaption className="sticky -bottom-4 bg-white text-black py-3 font-bold text-xs">
            Total Guests: {props.guests.length}
          </TableCaption>
          <TableHeader className="sticky !-top-4 bg-white !text-black text-xs border-b">
            <TableRow>
              <TableHead className="">Guest</TableHead>
              <TableHead className="text-center">Attending</TableHead>
              <TableHead className="text-center">+1</TableHead>
              <TableHead className="text-center">Meal Options</TableHead>
              <TableHead className="text-center">Note</TableHead>
              <TableHead />
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {props.guests.map((guest) => {
              const meals = JSON.parse(guest.mealOptions || "{}");
              return (
                <TableRow key={guest.id}>
                  <TableCell className="py-4">
                    <Text className="mb-2 font-semibold">{`${guest.firstName} ${guest.lastName}`}</Text>
                    <Text>{guest.streetAddress}</Text>
                    <Text>
                      {guest.city}, {guest.province} {guest.postalCode}
                    </Text>
                    <Text>{guest.country}</Text>
                    <Text>{guest.phoneNumber}</Text>
                    <Text className="underline">
                      <Link href={`mailto: ${guest.email}`}>{guest.email}</Link>
                    </Text>
                  </TableCell>
                  <TableCell className="text-center">{guest.isAttending ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{guest.isBringingPlusOne ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">
                    {guest.isAttending && (
                      <>
                        <Text>
                          <b>Appetizer:</b> {meals.Appetizer}
                        </Text>
                        <Text>
                          <b>Entree: </b>
                          {meals.Entree}
                        </Text>
                        <Text>
                          <b>Dessert:</b> {meals.Dessert}
                        </Text>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{guest.note}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost">
                      <Link href={`/guestlist/${guest.id}`}>
                        <PencilIcon />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleDeleteModalWindow(guest.id);
                      }}>
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
      <DeleteModal open={isDeleteModalOpen} handleIsOpen={handleIsDeleteModalOpen} handleDeleteGuest={handleDeleteGuest} />
      {isLoading && <Loading />}
    </>
  );
};

export default GuestlistTable;
