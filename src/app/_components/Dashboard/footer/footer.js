import FacebookIcon from "@/app/_icons/facebook-icon";
import { Logo } from "@/app/_icons/logo";

const Footer = () => {
  return (
    <div className="flex flex-col bg-black h-[700px] pt-10">
      <div className="bg-red-500 h-[92px] flex items-center justify-around">
        <p className="text-2xl font-bold text-white">Fresh fast delivered</p>
        <p className="text-2xl font-bold text-white">Fresh fast delivered</p>
        <p className="text-2xl font-bold text-white">Fresh fast delivered</p>
      </div>

      <div className="flex pt-10 justify-around">
        <div className="flex flex-col items-center cursor-pointer">
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

        <div className="flex flex-col gap-2.5">
          <p className="text-gray-500">NOMNOM</p>
          <p className="text-white">Home</p>
          <p className="text-white">Contact us</p>
          <p className="text-white">Delivery zone</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-gray-500">MENU</p>
          <p className="text-white">Appetizers</p>
          <p className="text-white">Salads</p>
          <p className="text-white">Pizzas</p>
          <p className="text-white">Main Dishes</p>
          <p className="text-white">Desserts</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <br />
          <p className="text-white">Side dish</p>
          <p className="text-white">Brunch</p>
          <p className="text-white">Desserts</p>
          <p className="text-white">Beverages</p>
          <p className="text-white">Fish & Sea foods</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-gray-500">FOLLOW US</p>
          <div className="flex gap-5">
            <div className="bg-white rounded-full h-7 w-7"></div>
            <div className="bg-white rounded-full h-7 w-7"></div>
          </div>
        </div>
      </div>
      <hr className="w-[90%] mx-auto mt-10" />

      <div className="flex justify-start gap-10 pl-[5%] pt-10">
        <p className="text-gray-500">Copy right 2024 © Nomnom LLC</p>
        <p className="text-gray-500">Privacy policy</p>
        <p className="text-gray-500">Terms and conditions</p>
        <p className="text-gray-500">Cookie policy</p>
      </div>
    </div>
  );
};
export default Footer;
