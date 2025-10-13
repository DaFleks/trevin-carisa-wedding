import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/prisma";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const id = req.cookies.get("session_id")?.value;

  if (!id) return NextResponse.redirect(new URL("/guestlist/login", req.url));

  const session = await prisma.session.findUnique({ where: { id: id } });

  if (!session) return NextResponse.redirect(new URL("/guestlist/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/guestlist((?!/login).*)"],
};
