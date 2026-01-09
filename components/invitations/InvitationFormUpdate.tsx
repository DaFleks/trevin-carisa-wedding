"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { PencilIcon, TrashIcon } from "lucide-react";

import { Guest } from "@prisma/client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import Text from "../aetherium/Text";
import Container from "../aetherium/Container";

import MealResult from "./MealResult";
import InviteeForm from "./InviteeForm";
import CheckedResult from "./CheckedResult";

import { deleteInviteeById, updateInvitationNoteById, updateInvitationTitleById } from "@/lib/actions";

type InvitationWithGuests = {
  id: string;
  title: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  guests: Guest[];
};

interface InvitationFormUpdateProps {
  invitation: InvitationWithGuests;
}

const InvitationFormUpdate = (props: InvitationFormUpdateProps) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [currentInvitee, setCurrentInvitee] = useState<Guest | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setTitle(props.invitation.title);
    setNotes(props.invitation.note ?? "");
  }, [props.invitation.title, props.invitation.note]);

  const handleUpdateTitle = async (e: FormEvent) => {
    e.preventDefault();
    await updateInvitationTitleById(props.invitation.id, title);
    router.refresh();
  };

  const handleSelectCurrentInvitee = (id?: string) => {
    if (!id) setCurrentInvitee(undefined);
    if (id) setCurrentInvitee(props.invitation.guests.find((guest) => guest.id === id));
  };

  const handleDeleteInvitee = async (e: MouseEvent<HTMLButtonElement>) => {
    await deleteInviteeById(e.currentTarget.id);
    handleSelectCurrentInvitee();
    router.refresh();
  };

  const handleUpdateNote = async (e: FormEvent) => {
    e.preventDefault();
    await updateInvitationNoteById(props.invitation.id, notes);
    router.refresh();
  };

  return (
    <Container className="grid grid-cols-3 gap-4 h-3/4">
      <Container className="space-y-4 bg-white p-4 rounded-xl shadow col-span-2">
        <h3 className="text-2xl font-medium">Title</h3>
        <form onSubmit={handleUpdateTitle} className="flex items-end justify-between gap-4 w-1/2">
          <Container className="space-y-2 w-full">
            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="" />
          </Container>
          <Button className="bg-slate-600 hover:bg-slate-600/90 w-fit">Update Title</Button>
        </form>

        <h3 className="text-2xl font-medium">Details</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invitee</TableHead>
              <TableHead className="text-center">Attending</TableHead>
              <TableHead className="text-center">Is a Child?</TableHead>
              <TableHead className="text-center">Meal</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.invitation.guests.map((g) => (
              <TableRow key={g.id} className={`${currentInvitee?.id === g.id && "bg-muted/50"}`}>
                <TableCell>
                  <Text className="font-medium">{g.name}</Text>
                  <Text>{g.email}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <CheckedResult flag={g.isAttending} />
                </TableCell>
                <TableCell className="text-center">
                  <CheckedResult flag={g.isChild} />
                </TableCell>
                <TableCell className="text-center">
                  <MealResult meal={g.meal} />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" className="w-fit" onClick={() => handleSelectCurrentInvitee(g.id)}>
                    <PencilIcon />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button id={g.id} variant="ghost" className="w-fit" onClick={handleDeleteInvitee}>
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-2xl font-medium">Notes</h3>
        <form onSubmit={handleUpdateNote}>
          <Container className="w-1/2 space-y-4">
            <Textarea
              defaultValue={props.invitation.note ?? ""}
              onChange={(e) => setNotes(e.currentTarget.value)}
              rows={8}
              className="resize-none h-[200px]"></Textarea>
            <Button className="bg-slate-600 hover:bg-slate-600/90 w-fit float-end">Update Notes</Button>
          </Container>
        </form>
      </Container>

      <InviteeForm invitationId={props.invitation.id} invitee={currentInvitee} handleSelectCurrentInvitee={handleSelectCurrentInvitee} />
    </Container>
  );
};

export default InvitationFormUpdate;
