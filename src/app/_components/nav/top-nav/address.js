"use client";

import MapIcon from "@/app/_icons/map-icon";
import RightArrowIcon from "@/app/_icons/rightArrow-icon";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Address = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form>
          <DialogTrigger asChild>
            <button>
              <div className="flex justify-start gap-2.5 p-2.5 bg-white h-9 w-fit rounded-full items-center">
                <div>
                  <MapIcon />
                </div>
                <p className="text-red-500 text-sm">
                  Delivery address:{" "}
                  <span className="text-gray-500">Add location</span>
                </p>
                <RightArrowIcon />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Please write your address</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <textarea
                  className="h-[100px] border rounded-sm align-top text-start pl-2 pt-2"
                  placeholder="Please enter your address here"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => setDialogOpen(false)}>
                Deliver here
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
