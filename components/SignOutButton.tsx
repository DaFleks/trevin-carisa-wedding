"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const response = await fetch("/api/auth", { method: "DELETE" });
        const data = await response.json();
        router.refresh();
      }}>
      <LogOutIcon />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
