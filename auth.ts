import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const password = credentials?.password;

        if (!password) return null;

        const stored = await prisma.auth.findFirst();

        const isValid = await bcrypt.compare(String(password), stored?.hashedPassword ?? "");

        if (!isValid) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return null;
        }

        // return user object with their profile data
        return { id: "single user", name: "Guest" };
      },
    }),
  ],
});
