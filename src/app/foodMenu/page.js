"use client";

import Dishes from "../_components/dishes/dishes";
import DishesCategory from "../_components/dishes/dishes-category";
import Nav from "../_components/nav/left-nav";
import { useState, useEffect } from "react";

const foodMenu = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-gray-300 h-screen flex">
      <Nav fillMenu={true} />
      <div className="relative flex flex-col flex-0 mx-auto top-20">
        <DishesCategory />
        <Dishes />
      </div>
    </div>
  );
};

export default foodMenu;
