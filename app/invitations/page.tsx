import Container from "@/components/aetherium/Container";
import Text from "@/components/aetherium/Text";
import CheckedResult from "@/components/invitations/CheckedResult";
import MealResult from "@/components/invitations/MealResult";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import Link from "next/link";

const page = async () => {
  const invitations = await prisma.invitation.findMany({ include: { guests: { orderBy: { name: "desc" } } } });

  return (
    <>
      <h6 className="text-4xl font-medium">Invite List</h6>
      <ul className="space-y-4 ">
        {invitations.map((i) => (
          <li key={i.id} className="border list-none bg-white rounded-xl shadow">
            <Container className="p-4 space-y-8">
              <Container className="flex items-center justify-between">
                <Text className="font-medium text-2xl">{i.title}</Text>
                <Button asChild className="bg-slate-600 hover:bg-slate-600/90 w-fit">
                  <Link href={`/invitations/${i.id}`}>Edit Invitation</Link>
                </Button>
              </Container>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Invitee</TableHead>
                    <TableHead className="text-center">Attending</TableHead>
                    <TableHead className="text-center">Is a Child?</TableHead>
                    <TableHead className="text-center">Meal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {i.guests.map((g) => (
                    <TableRow key={g.id}>
                      <TableCell>
                        <Text className="font-medium">{g.name}</Text>
                        <Text>{g.email}</Text>
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckedResult flag={g.isAttending} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckedResult flag={g.isChild} />
                      </TableCell>
                      <TableCell className="text-center">
                        <MealResult meal={g.meal} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
