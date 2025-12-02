"use client";

import { useState, useEffect } from "react";
import TopNav from "./_components/nav/top-nav";
import Hero from "./_components/Dashboard/hero/hero";
import DashboardDishes from "./_components/Dashboard/dishes/dishes";
import Footer from "./_components/Dashboard/footer/footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Home = () => {
  const [grouped, setGrouped] = useState({});
  const [currentTokenId, setCurrentTokenId] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFoods = async () => {
      const res = await fetch("https://food-delivery-isxu.onrender.com/foods");
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

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
    }
    const token = localStorage.getItem("token");
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    setCurrentTokenId(decoded.id);
  }, []);

  return (
    <>
      <div className="min-h-screen pb-10 bg-gray-500">
        <TopNav
          cartItems={cartItems}
          setCartItems={setCartItems}
          currentTokenId={currentTokenId}
        />
        <Hero />
        <div className="mx-auto px-12 w-fit mt-2.5">
          <DashboardDishes
            grouped={grouped}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
