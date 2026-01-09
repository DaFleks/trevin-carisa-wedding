"use client";

import { HeartIcon } from "lucide-react";
import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Container className="w-64 bg-neutral-200 p-4 border-r  space-y-8">
      <Container className="flex items-center gap-2 select-none">
        <HeartIcon />
        <Text className="text-2xl font-medium">T&C Guestlist</Text>
      </Container>
      <ul className="space-y-4 font-medium">
        <li>
          <Link href="/invitations">Invite List</Link>
        </li>
        <li>
          <Link href="/invitations/add">Add New Invitation</Link>
        </li>
        <li></li>
      </ul>
    </Container>
  );
};

export default Sidebar;
