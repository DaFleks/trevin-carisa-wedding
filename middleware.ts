import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log(token);

  const { pathname } = req.nextUrl;

  // 🟢 Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/guestlist/login") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 🔒 Require auth for everything else
  if (!token) {
    const loginUrl = new URL("/guestlist/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|guestlist/login|$).*)"],
};
