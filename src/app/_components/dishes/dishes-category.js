"use client";

import { useState, useEffect } from "react";

const DishesCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories");
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
    <div className="relative top-20 ">
      <div className="bg-white h-[200px] w-[70vw] rounded-2xl p-2.5">
        <p className="text-xl font-bold">Dishes Categories</p>
        <div className="flex gap-2.5">
          {data.map((item) => (
            <button
              key={item._id}
              className="bg-gray-300 rounded-full px-2.5 text-black"
            >
              {item.name}
              <span className="rounded-full bg-black text-white px-2">
                3 
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesCategory;
