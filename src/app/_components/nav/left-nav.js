import { Logo } from "@/app/_icons/logo";
import { MenuIcon } from "@/app/_icons/menu-icon";
import { SettingsIcon } from "@/app/_icons/settings-icon";
import { TruckIcon } from "@/app/_icons/truck-icon";
import WhiteMenuIcon from "@/app/_icons/whiteMenu-icon";
import WhiteTruckIcon from "@/app/_icons/whiteTruck-icon";

const Nav = (props) => {
  const { fillMenu, fillOrder, fillSettings } = props;
  return (
    <div className="bg-white w-[200px] h-screen">
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
        <button
          className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full"
          style={{ backgroundColor: fillMenu ? "black" : "transparent" }}
        >
          <div>{fillMenu ? <WhiteMenuIcon /> : <MenuIcon />}</div>
          <p
            className="text-sm"
            style={{ color: fillMenu ? "white" : "black" }}
          >
            Food Menu
          </p>
        </button>
        <button
          className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full"
          style={{ backgroundColor: fillOrder ? "black" : "transparent" }}
        >
          <div>{fillOrder ? <WhiteTruckIcon /> : <TruckIcon />}</div>

          <p
            className="text-sm"
            style={{ color: fillOrder ? "white" : "black" }}
          >
            Orders
          </p>
        </button>
        <button
          className="flex items-center my-4 justify-left gap-5 p-2.5 mr-2.5 rounded-full"
          style={{ backgroundColor: fillSettings ? "black" : "transparent" }}
        >
          <div>
            <SettingsIcon />
          </div>

          <p className="text-black text-sm">Settings</p>
        </button>
      </div>
    </div>
  );
};
export default Nav;
