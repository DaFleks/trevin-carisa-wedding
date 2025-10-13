import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const meals = formData.mealOptions.split(",");

    await prisma.guest.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isAttending: formData.isAttending === "yes" ? true : false,
        isBringingPlusOne: formData.isBringingPlusOne === "yes" ? true : false,
        mealOptions: JSON.stringify({ Appetizer: meals[0], Entree: meals[1], Dessert: meals[2] }),
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
        note: formData.note,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage = "There was an error!";

    if (error.code === "P2002") errorMessage = "That email already exists in the list!";
    return NextResponse.json({ message: errorMessage });
  }
  return NextResponse.json({ message: "Guest Created!", status: 201 });
}

export async function PATCH(req: Request) {
  try {
    const formData = await req.json();
    const meals = formData.mealOptions.split(",");
    console.log(JSON.stringify({ Appetizer: meals[0], Entrees: meals[1], Desserts: meals[2] }));

    await prisma.guest.update({
      where: { id: formData.id },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isAttending: formData.isAttending === "yes" ? true : false,
        isBringingPlusOne: formData.isBringingPlusOne === "yes" ? true : false,
        mealOptions: JSON.stringify({ Appetizer: meals[0], Entree: meals[1], Dessert: meals[2] }),
        streetAddress: formData.streetAddress,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
        note: formData.note,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage = "There was an error!";

    if (error.code === "P2002") errorMessage = "That email already exists in the list!";
    return NextResponse.json({ message: errorMessage });
  }

  return NextResponse.json({ message: "Guest Updated!", status: 204 });
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


