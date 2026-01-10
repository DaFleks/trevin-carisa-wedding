import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import Modal from "./Modal";
import GuestData from "./rsvp/GuestData";
import { Button } from "./ui/button";
import { useWeddingContext } from "./WeddingProvider";
import { MealOptions } from "@prisma/client";
import { getInvitationByEmail, updateInvitationById } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
import { FaBell } from "react-icons/fa";

type InvitationWithGuest = {
  guests: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    invitationId: string;
    isAttending: boolean;
    isChild: boolean;
    meal: MealOptions;
  }[];
} & {
  id: string;
  title: string;
  note: string | null;
  rsvp: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface RSVPModalProps {
  toggleIsRsvpOpen: () => void;
}

const RSVPModal = (props: RSVPModalProps) => {
  const { tangerineFont, invitationEmail } = useWeddingContext();
  const [invitation, setInvitation] = useState<null | undefined | InvitationWithGuest>(null);

  useEffect(() => {
    (async () => {
      const result = await getInvitationByEmail(invitationEmail);
      if (result?.invitation) setInvitation(result.invitation);
    })();
  }, [invitationEmail]);

  const handleIsAttending = (guestId: string, isAttending: boolean) => {
    setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        guests: prev.guests.map((guest) => (guest.id === guestId ? { ...guest, isAttending } : guest)),
      };
    });
  };

  const handleMeal = (guestId: string, meal: MealOptions) => {
    setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        guests: prev.guests.map((guest) => (guest.id === guestId ? { ...guest, meal: meal } : guest)),
      };
    });
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInvitation((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        note: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateInvitationById(invitation!.id, invitation!);
    setInvitation(null);
  };

  return (
    <Modal className="px-4 py-8 bg-black size-full rounded-none space-y-4 overflow-y-auto">
      {invitation ? (
        <>
          <h1 className={`text-5xl text-center ${tangerineFont}`}>RSVP</h1>
          <Text className="text-center font-medium mb-8">
            Kindly RSVP by confirming the details <br />
            of the invitation you were provided.
          </Text>

          <Container className="bg-white/10 border-neutral-700 border py-8 px-4 space-y-8 xl:w-1/3 mx-auto">
            <h3 className={`text-5xl text-center ${tangerineFont}`}>{invitation?.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Container className={`${invitation.guests.length === 1 ? "xl:w-1/2 mx-auto" : "space-y-8  xl:space-y-0 xl:grid grid-cols-2 gap-4"}`}>
                {invitation.guests.map((g) => (
                  <GuestData key={g.id} guest={g} handleIsAttending={handleIsAttending} handleMeal={handleMeal} />
                ))}
              </Container>

              <Container className=" bg-white/10 p-4 shadow-md shadow-black">
                <h3 className={`text-5xl text-center mb-2 ${tangerineFont}`}>Notes</h3>
                <Text className="text-sm text-center mb-6">
                  Anything we should know? <br /> (dietary needs, allergies, etc.)
                </Text>
                <Textarea
                  className="bg-white resize-none h-[100px] text-sm text-black"
                  value={invitation.note ?? ""}
                  onChange={handleNoteChange}></Textarea>
              </Container>
              <Button className="bg-emerald-700 hover:bg-emerald-700/90 rounded-none font-bold">Confirm RSVP</Button>
            </form>
          </Container>
        </>
      ) : (
        <Container className="size-full flex items-center justify-center text-center">
          <Container className={`space-y-4`}>
            <Text className={`text-4xl font-bold ${tangerineFont}`}>Thank you!</Text>
            <Text className={`text-4xl font-bold ${tangerineFont}`}>Your RSVP has been received!</Text>
            <Text className="text-sm mb-8">
              If you require any changes, <br />
              please contact Trevin or Carisa.
            </Text>
            <Button variant="outline" className="font-bold" onClick={props.toggleIsRsvpOpen}>
              Close
            </Button>
          </Container>
        </Container>
      )}
    </Modal>
  );
};

export default RSVPModal;
