import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    await prisma.guest.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isBringingPlusOne: formData.isBringingPlusOne,
        mealOptions: formData.mealOptions,
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        note: formData.note,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "There was an error!" });
  }
  return NextResponse.json({ message: "Guest Created!" });
}

export async function PATCH(req: Request) {
  try {
    const formData = await req.json();

    await prisma.guest.update({
      where: { id: formData.id },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isBringingPlusOne: formData.isBringingPlusOne,
        mealOptions: formData.mealOptions,
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        note: formData.note,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "There was an error!" });
  }

  return NextResponse.json({ message: "Guest Updated!" });
}

export async function DELETE(req: Request) {
  const data = await req.json();

  try {
    await prisma.guest.delete({ where: { id: data.id } });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ message: "There was an error!" });
  }
  return NextResponse.json({ message: "Guest deleted!" });
}
