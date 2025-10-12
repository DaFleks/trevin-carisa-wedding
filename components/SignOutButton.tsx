"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={async () => {}}>
      <LogOutIcon />
      Sign Out
    </Button>
  );
};

export default SignOutButton;
