import NextAuth, { type NextAuthConfig, type Session, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

/** 1️⃣  Define a proper User shape */
interface SimpleUser extends User {
  id: string;
  name: string;
  role?: string;
}

/** 2️⃣  Create your Auth.js config */
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const password = credentials?.password;
        const store = await prisma.auth.findFirst();
        if (!store) return null;

        const match = await bcrypt.compare(password as string, store.hashedPassword);
        if (!match) return null;

        // Must return a plain serializable object
        const user: SimpleUser = { id: "single-user", name: "Guest", role: "user" };
        return user;
      },
    }),
  ],
  pages: { signIn: "/guestlist/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  /** 3️⃣  Typed callbacks */
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as SimpleUser;
        token.id = u.id;
        token.name = u.name;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Explicitly type-cast to NextAuth Session
      const s = session as Session & {
        user: { id?: string; name?: string; role?: string };
      };

      s.user = {
        id: token.id as string,
        name: token.name as string,
        role: token.role as string,
      };

      return s;
    },
  },
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
};

/** 4️⃣  Export typed helpers */
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
