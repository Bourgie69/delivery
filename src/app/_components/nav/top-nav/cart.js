"use client";

import Image from "next/image";
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
import CartWhiteIcon from "@/app/_icons/cartWhite-icon";

const Cart = (props) => {
  const { cartItems, setCartItems, currentTokenId } = props;

  const [cartPage, setCartPage] = useState(true);
  const[totalPrice, setTotalPrice] = useState(0)

  const addQuantity = (item) => {
    item.quantity += 1;
  };

  const handleCheckout = async () => {
    console.log(currentTokenId ? "123" : "345");

    const response = await fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: currentTokenId,
        foodOrderItems: [],
        status: "PENDING",
        totalPrice: totalPrice,
      }),
    });
  };

  const reduceQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const index = cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index > -1) {
        cartItems.splice(index, 1);
      }
    }
  };

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
        <SheetContent className="bg-gray-900 border-0 w-[530px] max-w-none! overflow-scroll">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <CartWhiteIcon />
              Order Detail
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-10 items-center">
            <div className="bg-white w-[80%] h-fit flex justify-between rounded-full p-1">
              <button
                className="w-[45%] text-center text-black text-2xl rounded-full"
                style={{
                  backgroundColor: cartPage ? "red" : "transparent",
                  color: cartPage ? "white" : "black",
                }}
                onClick={() => setCartPage(true)}
              >
                Cart
              </button>
              <button
                className="w-[45%] text-center text-black text-2xl rounded-full"
                style={{
                  backgroundColor: !cartPage ? "red" : "transparent",
                  color: !cartPage ? "white" : "black",
                }}
                onClick={() => setCartPage(false)}
              >
                Order
              </button>
            </div>
            <div
              className="flex flex-col gap-10 h-fit w-[80%] rounded-2xl"
              style={{ display: cartPage ? "flex" : "none" }}
            >
              <div className="bg-white rounded-2xl px-2">
                <p className="text-2xl text-gray-500">My Cart</p>
                <div className="flex justify-center items-center py-2">
                  <hr className="w-75" />
                </div>
                <div className="flex flex-col gap-2 pb-2">
                  {cartItems.length === 0 ? (
                    <p>Your Cart is empty</p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex bg-gray-300 rounded-2xl"
                      >
                        <div className="relative w-32 h-32 rounded-xl bg-gray-100 overflow-hidden border border-gray-300 shadow-sm">
                          {item.image?.length > 0 ? (
                            <Image
                              src={item.image[0]}
                              alt="Dish image"
                              fill
                              className="object-cover object-center w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <p>{item.name}</p>
                          <p>${item.price}</p>
                          <div className="flex items-center gap-2.5">
                            <Button onClick={() => reduceQuantity(item)}>
                              -
                            </Button>
                            <p>{item.quantity}</p>
                            <Button onClick={() => addQuantity(item)}>+</Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <hr />
                  <p>Delivery address:</p>
                  <textarea
                    placeholder="Please enter delivery address here"
                    className="border h-20 rounded-2xl p-2"
                  />
                </div>
              </div>
              <div
                className="flex-col bg-white rounded-2xl p-2 gap-2"
                style={{ display: cartItems.length !== 0 ? "flex" : "none" }}
              >
                <p className="text-2xl text-gray-500">Payment Info</p>
                <p>
                  Items: $
                  <span>
                    {cartItems.reduce((acc, current) => {
                      return acc + current.price * current.quantity;
                    }, 0)}
                  </span>
                </p>
                <p>Shipping: $5</p>
                <hr />
                <p>
                  Total: $
                  <span>
                    {cartItems.reduce((acc, current) => {
                      return acc + current.price * current.quantity;
                    }, 5)}
                  </span>
                </p>

                <Button variant="destructive" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>

            <div
              className="bg-white h-10 w-[80%] p-2 rounded-2xl"
              style={{ display: cartPage ? "none" : "block" }}
            >
              Order
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
