"use client";

import Container from "../aetherium/Container";
import Text from "../aetherium/Text";
import { Button } from "../ui/button";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface GuestProps {
  name: string;
}

const Guest = (props: GuestProps) => {
  return (
    <Container className="space-y-6 bg-white/10 p-4 shadow-md shadow-black">
      <Text className="font-medium text-lg">{props.name}</Text>
      <Container className="grid grid-cols-2 gap-6 overflow-hidden">
        <Button variant="ghost" className="border-2 border-emerald-400 rounded-none">
          Attending
        </Button>
        <Button variant="ghost" className="border-2 border-rose-400 rounded-none">
          Not Attending
        </Button>
      </Container>
      <Container className="space-y-4">
        <Label>Meal Selection</Label>
        <Select>
          <SelectTrigger className="w-full bg-white rounded-none">
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
    </Container>
  );
};

export default Guest;
