"use server";

import { MealOptions } from "@prisma/client";
import prisma from "./prisma";

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

export async function verifyEmail(email: string) {
  const normalized = email.trim().toLowerCase();

  const invitation = await prisma.invitation.findFirst({
    where: {
      guests: {
        some: { email: normalized }, // invitation must have at least one guest with this email
      },
    },
    include: {
      guests: { where: { email: normalized } }, // optional: only return the matching guest(s)
    },
  });

  if (!invitation) return { success: false };

  return { success: true, invitation }; // invitation will be null if no match
}

export async function updateInvitationById(invitationId: string, data: InvitationWithGuest) {
  try {
    await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        rsvp: true,
        note: data.note,
        guests: {
          update: data.guests.map((g) => ({
            where: { id: g.id },
            data: {
              name: g.name,
              email: g.email,
              isAttending: g.isAttending,
              isChild: g.isChild,
              meal: g.meal,
            },
          })),
        },
      },
      include: { guests: true },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function createInvitation(title: string) {
  try {
    const invitation = await prisma.invitation.create({
      data: {
        title: title,
      },
    });

    return { success: true, invitation };
  } catch (e) {
    console.error(e);
  }
}

export async function updateInvitationTitleById(id: string, title: string) {
  try {
    await prisma.invitation.update({ where: { id: id }, data: { title: title } });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function updateInvitationNoteById(id: string, note: string) {
  try {
    await prisma.invitation.update({ where: { id: id }, data: { note: note } });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function getInvitationByEmail(email: string) {
  try {
    const invitation = await prisma.invitation.findFirst({
      include: { guests: true },
      where: { guests: { some: { email: { equals: email, mode: "insensitive" } } } },
    });

    return { success: true, invitation };
  } catch (e) {
    console.error(e);
  }
}

export async function createInvitee(invitationId: string, name: string, email: string, isAttending: boolean, isChild: boolean, meal: MealOptions) {
  try {
    await prisma.guest.create({
      data: {
        name: name,
        email: email,
        isAttending: isAttending,
        isChild: isChild,
        meal: isChild ? "KIDS" : meal,
        invitationId: invitationId,
      },
    });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}

export async function updateInviteeById(id: string, name: string, email: string, isAttending: boolean, isChild: boolean, meal: MealOptions) {
  try {
    await prisma.guest.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        isAttending: isAttending,
        isChild: isChild,
        meal: isChild ? "KIDS" : meal,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function deleteInviteeById(id: string) {
  try {
    await prisma.guest.delete({ where: { id: id } });
  } catch (e) {
    console.error(e);
  }

  return { success: true };
}
