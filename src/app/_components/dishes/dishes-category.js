"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const DishesCategory = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return alert("Please fill out field!");

    try {
      const response = await fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      console.log("Category added", data);
      setCategoryName("");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

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
  }, [data]);
  return (
    <div className="relative">
      <div className="bg-white h-[200px] w-[70vw] rounded-2xl p-2.5">
        <p className="text-xl font-bold">Dishes Categories</p>
        <div className="flex gap-2.5 flex-wrap mt-2.5">
          {data.map((item) => (
            <button
              key={item._id}
              className="bg-gray-300 rounded-full px-2.5 text-black"
            >
              {item.name}{" "}
              <span className="rounded-full bg-black text-white px-2">3</span>
            </button>
          ))}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="rounded-full w-10 h-10">
                +
              </Button>
              
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new category</DialogTitle>
              </DialogHeader>
              <p>Category name</p>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
              <div className="flex justify-end">
                <Button className="w-[30%]" onClick={handleAddCategory}>
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DishesCategory;
