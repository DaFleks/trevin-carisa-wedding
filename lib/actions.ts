"use server";

import { MealOptions } from "@prisma/client";
import prisma from "./prisma";

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
