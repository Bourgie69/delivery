import { Table, TableBody } from "@/components/ui/table";
import Nav from "./_components/nav/left-nav";
import OrderNav from "./_components/orders/order-nav";
import Orders from "./_components/orders/orders";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-gray-300 h-screen">
      <Nav />
      <div className="relative flex flex-col top-20 left-60">
        <OrderNav />
        <Orders />
        <Button className="bg-amber-50 text-black w-[100]">123</Button>
      </div>
    </div>
  );
}
