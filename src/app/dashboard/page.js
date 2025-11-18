"use client";

import TopNav from "../_components/nav/top-nav";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../_components/footer/footer";

const Dashboard = () => {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      const res = await fetch("http://localhost:8000/foods");
      const data = await res.json();
      const groupedData = data.reduce((acc, item) => {
        const catName = item.category?.name || "Uncategorized";
        if (!acc[catName]) acc[catName] = [];
        acc[catName].push(item);
        return acc;
      }, {});
      setGrouped(groupedData);
    };

    fetchFoods();
  }, []);
  return (
    <>
      <div className="min-h-screen py-10 bg-gray-700">
        <TopNav />
        <div className="bg-white h-50">Hero</div>
        <div className="mx-auto px-12 w-fit mt-2.5">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="text-xl font-bold text-white">{category}</p>
              <div className="flex flex-wrap gap-2.5 mt-2.5">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="relative flex flex-col gap-2.5 items-center h-60 w-67 rounded-2xl p-2.5 border bg-white"
                  >
                    <div className="relative w-full h-32 rounded-xl bg-gray-100 overflow-hidden border border-gray-300 shadow-sm">
                      {item.image?.length > 0 ? (
                        <Image
                          src={item.image[0]}
                          alt="Dish image"
                          fill
                          className="object-cover object-center w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between w-full">
                      <p className="text-red-500 font-semibold">{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <p className="line-clamp-2 pb-2 text-xs">
                      {item.ingredients}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
