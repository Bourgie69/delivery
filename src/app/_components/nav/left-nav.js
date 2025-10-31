import { Logo } from "@/app/icons/logo";
import { MenuIcon } from "@/app/icons/menu-icon";
import { SettingsIcon } from "@/app/icons/settings-icon";
import { TruckIcon } from "@/app/icons/truck-icon";

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
          <button className="flex items-center my-4 justify-left gap-5">
            <div>
              <MenuIcon />
            </div>
            <p className="text-black text-sm">Food Menu</p>
          </button>
          <button className="flex items-center my-4 justify-left gap-5">
            <div>
              <TruckIcon />
            </div>

            <p className="text-black text-sm">Orders</p>
          </button>
          <button className="flex items-center my-4 justify-left gap-5">
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
