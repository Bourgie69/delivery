"use client";

import Image from "next/image";
import CartIcon from "@/app/_icons/cart-icon";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import OrderByUser from "./orderByUser";

const Cart = (props) => {
  const { cartItems, setCartItems, currentTokenId } = props;

  const [cartPage, setCartPage] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const orderTotal = cartItems.reduce(
      (acc, items) => acc + items.price * items.quantity,
      5
    );
    setTotalPrice(orderTotal);
    console.log(cartItems)
  }, [cartItems]);

  const addQuantity = (item) => {
    item.quantity += 1;
  };

  const handleCheckout = async () => {
    console.log(currentTokenId ? "123" : "345");

    if (!address) {
      alert("please enter address");
      return;
    }
    const response = await fetch("https://food-delivery-isxu.onrender.com/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: currentTokenId,
        foodOrderItems: cartItems.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
        status: "PENDING",
        totalPrice: totalPrice,
        address: address,
      }),
    });
    setOrderSuccess(true);
    setCartItems([]);
    setAddress("");
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
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
                  <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Your Order has been successfully placed!
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex justify-center items-center">
                      <Image
                        src="/orderSuccess.png"
                        alt="success"
                        height={250}
                        width={150}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setSheetOpen(false);
                          }}
                        >
                          Back to Home
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
            
              <OrderByUser show={cartPage}/>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
