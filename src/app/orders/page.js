"use client";

import Nav from "../_components/nav/left-nav";
import OrderNav from "../_components/orders/order-nav";
import Orders from "../_components/orders/orders";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
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
    <div className="bg-gray-300 h-screen">
      <Nav fillOrder={true}/>
      <div className="relative flex flex-col top-20 left-60">
        <OrderNav />

        {data.map((item) => (
          <Orders
            key={item._id}
            index={data.indexOf(item) + 1}
            email={item.user?.email}
            date={item.updatedAt}
            price={item.totalPrice}
          />
        ))}
      </div>
    </div>
  );
}
