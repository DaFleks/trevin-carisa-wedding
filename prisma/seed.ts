import { PrismaClient, Prisma } from "../lib/generated/prisma";
import * as guests from "@/lib/guestData.json";

const prisma = new PrismaClient();

const userData: Prisma.GuestCreateInput[] = guests;

export async function main() {
  for (const u of userData) {
    await prisma.guest.create({ data: u });
  }
}

main();
