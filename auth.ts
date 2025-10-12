import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const password = credentials?.password;
        const store = await prisma.auth.findFirst();
        console.log("hi!");
        console.log(password);
        console.log(store);

        console.log(await bcrypt.compare(password as string, store?.hashedPassword as string));
        if (await bcrypt.compare(password as string, store?.hashedPassword as string)) {
          console.log("login guuci");
          return { id: "single-user", name: "Guest" }; // a dummy user object
        }
        return null; // fail login
      },
    }),
  ],
  pages: {
    signIn: "/guestlist/login", // optional, your custom page
  },
  session: { strategy: "jwt" },
  // 🔐 Add this line:
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
