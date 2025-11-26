"use client";

import Nav from "../_components/nav/left-nav";
import OrderNav from "../_components/Admin/orders/order-nav";
import Orders from "../_components/Admin/orders/orders";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/orders");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex bg-gray-300 min-h-screen">
      <Nav fillOrder={true} />
      <div className="relative flex flex-0 flex-col mx-auto my-auto">
        <OrderNav />

        {data.map((item) => (
          <Orders
            key={item._id}
            index={data.indexOf(item) + 1}
            email={item.user.email}
            date={item.createdAt}
            price={item.totalPrice}
            status={item.status}
            address={item.address}
          />
        ))}
      </div>
    </div>
  );
}
