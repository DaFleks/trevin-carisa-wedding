import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();

  const store = await prisma.auth.findFirst();
  if (!store) return NextResponse.json({ message: "Auth store not found.", status: 500 });

  const isValid = await bcrypt.compare(password, store.hashedPassword);
  if (!isValid) return NextResponse.json({ message: "Wrong Password.", status: 401 });

  const session = await prisma.session.create({ data: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) } });

  (await cookies()).set("session_id", session.id, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ message: "Logged In!", status: 201 });
}

export async function DELETE(req: Request) {
  const currentSessionId = (await cookies()).get("session_id")?.value;
  console.log(currentSessionId);
  if (!currentSessionId) return NextResponse.json({ message: "You are already logged out." });

  try {
    await prisma.session.delete({ where: { id: currentSessionId } });
  } catch (error) {
    return NextResponse.json({ message: "There was an error." });
  }

  return NextResponse.json({ message: "Logged Out.", status: 201 });
}
