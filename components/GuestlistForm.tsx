"use client";

import Link from "next/link";
import Container from "./aetherium/Container";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { ChevronLeftCircleIcon, SendHorizonalIcon, TrashIcon } from "lucide-react";
import { useToggle } from "@/hooks/useToggle";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModal";
import { Guest } from "@prisma/client";
import Loading from "./aetherium/Loading/Loading";

interface GuestlistFormProps {
  guest?: Guest | null;
}

const guestListDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  isAttending: "no",
  isBringingPlusOne: "no",
  mealOptions: "",
  streetAddress: "",
  phoneNumber: "",
  city: "",
  province: "",
  country: "",
  postalCode: "",
  note: "",
};

const GuestlistForm = (props: GuestlistFormProps) => {
  const router = useRouter();

  const [isDeleteModalOpen, handleIsDeleteModalOpen] = useToggle(false);
  const [isLoading, handleIsLoading] = useToggle(false);

  //  TODO: restructure mealOptions when provided menu
  const [formData, setFormData] = useState(
    props.guest
      ? {
          ...props.guest,
          isAttending: props.guest.isAttending ? "yes" : "no",
          isBringingPlusOne: props.guest.isBringingPlusOne ? "yes" : "no",
          mealOptions:
            JSON.parse(props.guest.mealOptions || "").Appetizer +
            "," +
            JSON.parse(props.guest.mealOptions || "").Entree +
            "," +
            JSON.parse(props.guest.mealOptions || "").Dessert,
        }
      : guestListDefaultValues
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleIsLoading();
    const method = props.guest ? "PATCH" : "POST";
    const response = await fetch("/api/guestlist/", { method: method, body: JSON.stringify(formData) });
    const data = await response.json();
    handleIsLoading();
    alert(data.message);
  };

  const handleChange = (name: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteGuest = async () => {
    handleIsLoading();
    const response = await fetch("/api/guestlist", { method: "DELETE", body: JSON.stringify({ id: props.guest ? props.guest.id : "" }) });
    const data = await response.json();
    handleIsLoading();
    alert(data.message);
    router.push("/guestlist");
  };

  return (
    <Container className=" bg-white mx-auto w-2/3 p-8 border rounded-lg shadow-lg h-full flex flex-col justify-center gap-8">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-bold mb-8">{`Editing Guest`}</h1>
        <Container className="grid grid-cols-2 gap-4">
          <Container className="space-y-4">
            <Label htmlFor="firstName">First Name</Label>
            <Input
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
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Container>
        </Container>

        <Container className="grid grid-cols-7 gap-4">
          <Container className="space-y-4 col-span-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
          </Container>
          <Container className="space-y-4 col-span-2">
            <Label htmlFor="isAttending">Is Attending?</Label>
            <Select defaultValue={formData.isAttending} onValueChange={(val) => handleChange("isAttending", val)}>
              <SelectTrigger id="isAttending" name="isAttending" className="bg-white text-black w-full mb-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </Container>

          <Container className="space-y-4 col-span-2">
            <Label htmlFor="isBringingPlusOne">Is Bringing a +1?</Label>
            <Select defaultValue={formData.isBringingPlusOne} onValueChange={(val) => handleChange("isBringingPlusOne", val)}>
              <SelectTrigger id="isBringingPlusOne" name="isBringingPlusOne" className="bg-white text-black w-full mb-0">
                <SelectValue />
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

        <Container className="grid grid-cols-5 gap-4">
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
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
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
          <Button variant="outline" asChild className="font-semibold py-6">
            <Link href="/guestlist">
              <ChevronLeftCircleIcon />
              Go Back
            </Link>
          </Button>
          {props.guest && (
            <Button
              type="button"
              className="py-6 bg-red-900 hover:bg-red-900/90 cursor-pointer font-semibold"
              onClick={handleIsDeleteModalOpen}>
              <TrashIcon />
              Delete
            </Button>
          )}

          <Button type="submit" className="py-6 bg-slate-800 hover:bg-slate-700 col-start-3 cursor-pointer font-semibold">
            <SendHorizonalIcon />
            Submit
          </Button>
        </Container>
      </form>
      <DeleteModal open={isDeleteModalOpen} handleDeleteGuest={handleDeleteGuest} handleIsOpen={handleIsDeleteModalOpen} />
      {isLoading && <Loading />}
    </Container>
  );
};

export default GuestlistForm;
