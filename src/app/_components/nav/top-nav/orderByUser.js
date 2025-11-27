"use client";

import { AuthContext } from "@/app/_context/AuthContext";
import { useContext, useEffect, useState } from "react";

const OrderByUser = ({ show }) => {
  const { token, user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/orders/${user.id}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, token]);

  return (
    <div
      className="flex-col bg-white rounded-2xl px-2 w-[80%]"
      style={{ display: !show ? "flex" : "none" }}
    >
      <p className="text-2xl text-gray-500">Order history</p>
      <div className="flex flex-col justify-center items-center py-2">
        {data.map((item) => (
          <div className="flex w-full flex-col" key={item._id}>
            <div className="flex w-full justify-between">
              <p>$ {item.totalPrice}</p>
              <p>{item.status}</p>
            </div>
            <div>
              {item.foodOrderItems.map((item) => (
                <div key={item._id}
                className="flex w-full justify-between">
                  <p>{item.food.name}</p>
                  <p>x {item.quantity}</p>
                </div>
              ))}
              <p>{item.address}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderByUser;
