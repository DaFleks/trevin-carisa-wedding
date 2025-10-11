"use client";

import Link from "next/link";
import Container from "./aetherium/Container";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Guest } from "@/app/generated/prisma";
import { useState } from "react";
import { ChevronLeftCircleIcon } from "lucide-react";

interface GuestlistFormProps {
  guest?: Guest | null;
}

const guestListDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  isAttending: "",
  isBringingPlusOne: "",
  mealOptions: "",
  streetAddress: "",
  phoneNumber: "",
  city: "",
  province: "",
  postalCode: "",
  note: "",
};

const GuestlistForm = (props: GuestlistFormProps) => {
  const [formData, setFormData] = useState(props.guest ? props.guest : guestListDefaultValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = props.guest ? "PATCH" : "POST";
    const response = await fetch("/api/guestlist/", { method: method, body: JSON.stringify(formData) });
    const data = await response.json();
    alert(data.message);
  };

  const handleChange = (name: string, value: string | boolean | number) => {
    if (name === "isBringingPlusOne" || name === "isAttending") {
      let boolValue = false;
      if (value === "yes") boolValue = true;
      setFormData((prev) => ({ ...prev, [name]: boolValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Container className="mx-auto w-1/2 h-full flex flex-col justify-center gap-8">
      <Button asChild className="bg-neutral-600 w-1/3 font-semibold ml-auto py-6">
        <Link href="/guestlist">
          <ChevronLeftCircleIcon />
          Go Back
        </Link>
      </Button>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <Container className="grid grid-cols-2 gap-4">
          <Container className="space-y-4">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              required
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </Container>
          <Container className="space-y-4">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              required
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Container>
        </Container>

        <Container className="grid grid-cols-5 gap-4">
          <Container className="space-y-4 col-span-3">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Container>
          <Container className="space-y-4 col-span-2">
            <Label htmlFor="isBringingPlusOne">Is guest bringing a +1?</Label>
            <Select
              defaultValue={formData.isBringingPlusOne ? "yes" : "no"}
              onValueChange={(val) => handleChange("isBringingPlusOne", val)}>
              <SelectTrigger id="isBringingPlusOne" name="isBringingPlusOne" className="bg-white text-black w-full mb-0">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </Container>
        </Container>

        <Container className="space-y-4">
          <Label htmlFor="mealOptions">Meal Options</Label>
          <Input
            type="text"
            id="mealOptions"
            name="mealOptions"
            value={formData.mealOptions || ""}
            onChange={(e) => handleChange("mealOptions", e.target.value)}
          />
        </Container>
        <Container className="grid grid-cols-5 gap-4">
          <Container className="space-y-4 col-span-3">
            <Label htmlFor="street">Street Address</Label>
            <Input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress || ""}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
            />
          </Container>
          <Container className="space-y-4 col-span-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </Container>
        </Container>

        <Container className="grid grid-cols-4 gap-4">
          <Container className="space-y-4 col-span-2">
            <Label htmlFor="city">City</Label>
            <Input type="text" id="city" name="city" value={formData.city || ""} onChange={(e) => handleChange("city", e.target.value)} />
          </Container>
          <Container className="space-y-4">
            <Label htmlFor="province">Province</Label>
            <Input
              type="text"
              id="province"
              name="province"
              value={formData.province || ""}
              onChange={(e) => handleChange("province", e.target.value)}
            />
          </Container>
          <Container className="space-y-4">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={(e) => handleChange("postalCode", e.target.value)}
            />
          </Container>
        </Container>

        <Container className="space-y-4">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            name="note"
            className="bg-white text-black resize-none"
            value={formData.note || ""}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </Container>
        <Container className="grid grid-cols-3 gap-4">
          <Button variant="destructive" type="button" className="py-6 cursor-pointer font-semibold">
            Delete Guest
          </Button>
          <Button type="submit" className="py-6 bg-slate-800 hover:bg-slate-700 col-span-2 cursor-pointer font-semibold">
            Submit
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default GuestlistForm;
