"use client";

import { createInvitee, updateInviteeById } from "@/lib/actions";
import { FormEvent, useEffect, useState } from "react";
import Container from "../aetherium/Container";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Guest, MealOptions } from "@prisma/client";
import { useRouter } from "next/navigation";

interface InviteeFormProps {
  invitationId: string;
  invitee?: Guest;
  handleSelectCurrentInvitee: (id?: string) => void;
}

const InviteeForm = (props: InviteeFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAttending, setIsAttending] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [meal, setMeal] = useState<MealOptions>(MealOptions.CHICKEN);

  useEffect(() => {
    if (props.invitee) {
      setName(props.invitee.name ?? "");
      setEmail(props.invitee.email ?? "");
      setIsAttending(props.invitee.isAttending);
      setIsChild(props.invitee.isChild);
      setMeal(props.invitee.meal);
    }
  }, [props.invitee]);

  const router = useRouter();

  const handleCreateInvitee = async (e: FormEvent) => {
    e.preventDefault();
    await createInvitee(props.invitationId, name, email, isAttending, isChild, meal);
    router.refresh();
  };

  const handleUpdateInvitee = async (e: FormEvent) => {
    e.preventDefault();
    props.handleSelectCurrentInvitee();
    await updateInviteeById(props.invitee!.id, name, email, isAttending, isChild, meal);
    resetForm();
        router.refresh();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setIsAttending(false);
    setIsChild(false);
    setMeal(MealOptions.BEEF);
  };

  return (
    <form onSubmit={props.invitee ? handleUpdateInvitee : handleCreateInvitee} className="space-y-4 bg-white p-4 rounded-xl shadow">
      {!props.invitee && <h3 className="text-2xl font-medium">Add an Invitee</h3>}
      {props.invitee && <h3 className="text-2xl font-medium">Update an Invitee</h3>}

      <Container className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </Container>

      <Container className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Container>

      <Container className="grid grid-cols-3 gap-4 items-center">
        <Container className="space-y-2 flex items-center gap-4">
          <Label htmlFor="email">Is Attending?</Label>
          <Switch checked={isAttending} onCheckedChange={(value) => setIsAttending(value)} />
        </Container>
        <Container className="space-y-2 flex items-center gap-4">
          <Label htmlFor="email">Is a Child?</Label>
          <Switch checked={isChild} onCheckedChange={(value) => setIsChild(value)} />
        </Container>
      </Container>

      <Container className="space-y-2 w-1/2">
        <Label>Meal Option</Label>
        <Select disabled={isChild} defaultValue={meal} onValueChange={(v) => setMeal(v as MealOptions)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a meal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Meals</SelectLabel>
              <SelectItem value="CHICKEN">Chicken</SelectItem>
              <SelectItem value="BEEF">Beef</SelectItem>
              <SelectItem value="SALMON">Salmon</SelectItem>
              <SelectItem value="VEGETARIAN">Vegetarian</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Container>

      {props.invitee && <Button className="bg-emerald-600 hover:bg-emerald-600/90">Update Invitee</Button>}
      {!props.invitee && <Button className="bg-emerald-600 hover:bg-emerald-600/90">Add Invitee</Button>}
    </form>
  );
};

export default InviteeForm;
