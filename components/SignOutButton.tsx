"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        signOut();
      }}>
      <LogOutIcon />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
