"use client";

import { Logo } from "@/app/_icons/logo";
import UserIcon from "@/app/_icons/user-icon";
import { useRouter } from "next/navigation";
import Address from "./top-nav/address";
import Cart from "./top-nav/cart";

const TopNav = (props) => {
  const router = useRouter();

  const handleAddAddress = async (address) => {

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add dish");
      }

      const data = await response.json();
      console.log("Address added", data);
    } catch (err) {
      console.error(err);
    }
  };

  const { cartItems, setCartItems, currentTokenId } = props

  return (
    <div className="flex justify-between bg-black h-17 px-10 items-center">
      <div
        className="flex pl-10 justify-center gap-4 items-center cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <div>
          <Logo />
        </div>

        <div className="flex flex-col">
          <p className="text-white text-lg font-bold">
            Nom<span className="text-red-500">Nom</span>
          </p>
          <p className="text-gray-400 text-sm">Swift Delivery</p>
        </div>
      </div>

      <div className="flex gap-2.5 items-center">
        <Address />

        <Cart cartItems={cartItems} setCartItems={setCartItems} currentTokenId={currentTokenId}/>

        <div className="flex bg-red-500 h-9 w-9 rounded-full justify-center items-center">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
export default TopNav;
