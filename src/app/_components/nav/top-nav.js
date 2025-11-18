"use client";

import CartIcon from "@/app/_icons/cart-icon";
import { Logo } from "@/app/_icons/logo";
import MapIcon from "@/app/_icons/map-icon";
import RightArrowIcon from "@/app/_icons/rightArrow-icon";
import UserIcon from "@/app/_icons/user-icon";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
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
        <div className="flex justify-start gap-2.5 p-2.5 bg-white h-9 w-fit rounded-full items-center">
            <div>
                <MapIcon/>
            </div>
            <p className="text-red-500 text-sm">Delivery address: <span className="text-gray-500">Add location</span></p>
            <RightArrowIcon/>
        </div>

        <div className="flex bg-white h-9 w-9 rounded-full justify-center items-center">
            <CartIcon/>
        </div>

        <div className="flex bg-red-500 h-9 w-9 rounded-full justify-center items-center">
            <UserIcon/>
        </div>

      </div>
    </div>
  );
};
export default TopNav;
