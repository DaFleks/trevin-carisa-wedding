import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) return NextResponse.json({ message: "No email was provided.", status: 400 });

  try {
    const user = await prisma.guest.findUnique({ where: { email: email } });

    if (!user) return NextResponse.json({ message: "Sorry, that email was not found.", status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "There was an error." });
  }

  return NextResponse.json({ message: "Email verified!", status: 200 });
}
