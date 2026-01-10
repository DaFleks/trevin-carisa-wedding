"use client";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import { Button } from "../ui/button";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { Guest, MealOptions } from "@prisma/client";
import { useState } from "react";

interface GuestDataProps {
  guest: Guest;
  handleIsAttending: (guestId: string, isAttending: boolean) => void;
  handleMeal: (guestId: string, meal: MealOptions) => void;
}

const GuestData = (props: GuestDataProps) => {
  const [isAttendingActive, setIsAttendingActive] = useState(false);
  const [isNotAttendingActive, setIsNotAttendingActive] = useState(false);

  const handleIsAttendingActive = (isAttending: boolean) => {
    if (isAttending) {
      setIsAttendingActive(true);
      setIsNotAttendingActive(false);
    }
    if (!isAttending) {
      setIsAttendingActive(false);
      setIsNotAttendingActive(true);
    }
  };

  return (
    <Container className="space-y-6 bg-white/10 p-4 shadow-md shadow-black">
      <Text className="font-bold text-lg">{props.guest.name.toUpperCase()}</Text>
      <Container className="grid grid-cols-2 gap-6 overflow-hidden">
        <Button
          type="button"
          onClick={() => {
            handleIsAttendingActive(true);
            props.handleIsAttending(props.guest.id, true);
          }}
          variant="ghost"
          className={`border-2 border-emerald-400 hover:bg-emerald-400/50 hover:text-white rounded-none ${isAttendingActive && "bg-emerald-400/50"}`}>
          Attending
        </Button>
        <Button
          type="button"
          onClick={() => {
            handleIsAttendingActive(false);
            props.handleIsAttending(props.guest.id, false);
          }}
          variant="ghost"
          className={`border-2 border-rose-400 hover:bg-rose-400/50 hover:text-white rounded-none ${isNotAttendingActive && "bg-rose-400/50"}`}>
          Not Attending
        </Button>
      </Container>
      <Container className="space-y-4">
        <Label className="font-medium">Meal Selection</Label>
        {props.guest.isChild ? (
          <Select disabled>
            <SelectTrigger className="w-full bg-white rounded-none">
              <SelectValue placeholder="Kids Meal" />
            </SelectTrigger>
          </Select>
        ) : (
          <Select onValueChange={(v) => props.handleMeal(props.guest.id, v as MealOptions)}>
            <SelectTrigger className="w-full bg-white text-black rounded-none">
              <SelectValue placeholder="Select an entree" />
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
        )}
      </Container>
    </Container>
  );
};

export default GuestData;
