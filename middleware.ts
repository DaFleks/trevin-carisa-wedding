import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  console.log(req.url);

  console.log("MIDDLEWARE!");

  const id = req.cookies.get("session_id")?.value;

  console.log(id);

  if (!id) return NextResponse.redirect(new URL("/guestlist/login", req.url));

  const session = await prisma.session.findUnique({ where: { id: id } });

  if (!session) return NextResponse.redirect(new URL("/guestlist/login", req.url));

  return NextResponse.next();
}

export const config = {
   matcher: ["/guestlist((?!/login).*)"],
};
