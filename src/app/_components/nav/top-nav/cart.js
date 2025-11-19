"use client";

import CartIcon from "@/app/_icons/cart-icon";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartWhiteIcon from "@/app/_icons/cartWhite-icon";

const Cart = (props) => {

    const {cartItems, setCartItmes} = props

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <div className="flex bg-white h-9 w-9 rounded-full justify-center items-center">
              <CartIcon />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent className="bg-gray-700">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <CartWhiteIcon />
              Order Detail
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-10 items-center">
            <div className="bg-white w-[80%] h-fit flex justify-between rounded-full p-1">
              <button className="bg-black w-[45%] text-center text-white text-2xl rounded-full">
                Cart
              </button>
              <button className="bg-black w-[45%] text-center text-white text-2xl rounded-full">
                Order
              </button>
            </div>
            <div className="bg-white h-fit w-[80%] rounded-2xl">
              <p className="text-2xl text-gray-500 p-2">My Cart</p>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
