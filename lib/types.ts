import { MealOptions } from "@prisma/client";

export type InvitationWithGuests = {
  guests: {
    email: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    invitationId: string;
    isAttending: boolean;
    isChild: boolean;
    meal: MealOptions;
  }[];
} & {
  title: string;
  id: string;
  note: string | null;
  rsvp: boolean;
  createdAt: Date;
  updatedAt: Date;
};
