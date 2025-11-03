import { Logo } from "@/app/_icons/logo";
import { MenuIcon } from "@/app/_icons/menu-icon";
import { SettingsIcon } from "@/app/_icons/settings-icon";
import { TruckIcon } from "@/app/_icons/truck-icon";

const Nav = () => {
  return (
    <>
      <div className="bg-white w-[200px] h-screen absolute">
        <div className="flex pt-2.5 justify-center gap-4 items-center">
          <div>
            <Logo />
          </div>

          <div className="flex flex-col">
            <p className="text-black text-lg font-bold">NomNom</p>
            <p className="text-gray-400 text-sm">Swift Delivery</p>
          </div>
        </div>
        <div className="flex flex-col pt-4 pl-10">
          <button className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full">
            <div>
              <MenuIcon />
            </div>
            <p className="text-black text-sm">Food Menu</p>
          </button>
          <button className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full">
            <div>
              <TruckIcon />
            </div>

            <p className="text-black text-sm">Orders</p>
          </button>
          <button className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full">
            <div>
              <SettingsIcon />
            </div>

            <p className="text-black text-sm">Settings</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default Nav;
