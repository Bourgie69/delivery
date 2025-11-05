"use client";

import { useEffect, useState } from "react";
import Nav from "./_components/nav/left-nav";
import OrderNav from "./_components/orders/order-nav";
import Orders from "./_components/orders/orders";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/foods");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-300 h-screen">
      <Nav />
      <div className="relative flex flex-col top-20 left-60">
        <OrderNav />
        <Orders />
        <Button className="bg-amber-50 text-black w-[100px]">123</Button>
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-gray-200 p-2.5 rounded-2xl text-black h-fit w-fit"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
