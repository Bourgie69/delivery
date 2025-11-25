"use client";

import Dishes from "../_components/Admin/dishes/dishes";
import Nav from "../_components/nav/left-nav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const foodMenu = () => {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {

    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
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
    <div className="min-h-screen bg-gray-300 flex">
      <Nav fillMenu={true} />
      <div className="flex flex-col flex-0 mx-auto my-20">
        <Dishes />
      </div>
    </div>
  );
};

export default foodMenu;
