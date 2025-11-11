"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const UPLOAD_PRESET = "delivery";
const CLOUD_NAME = "dohxiuhvy";

const Dishes = () => {
  const [grouped, setGrouped] = useState({});
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAddDish = async (category) => {
    if (!foodName.trim()) return alert("Please fill out field!");

    try {
      const response = await fetch("http://localhost:8000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: foodName,
          price: foodPrice,
          category: category,
          image: foodImage ? [foodImage] : [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add dish");
      }

      const data = await response.json();
      console.log("Dish added", data);
      setFoodName("");
      setFoodPrice("");
    } catch (err) {
      console.error(err);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error("upload failed:", err);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);

      setFoodImage(url);
    } catch (err) {
      console.log("Failed Upload:", err.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    async function fetchFoods() {
      const res = await fetch("http://localhost:8000/foods");
      const data = await res.json();
      console.log(data);
      const groupedData = data.reduce((acc, item) => {
        const catName = item.category?.name || "Uncategorized";
        if (!acc[catName]) acc[catName] = [];
        acc[catName].push(item);
        return acc;
      }, {});
      setGrouped(groupedData);
    }

    fetchFoods();
  }, []);

  return (
    <div className="flex flex-col gap-2.5 mt-2 flex-wrap">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-white rounded-2xl p-2.5">
          <p className="text-xl font-bold">{category}</p>
          <div className="flex flex-wrap gap-2.5 mt-2.5">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex h-50 w-60 items-center justify-center border-2 border-dashed border-red-300 rounded-2xl cursor-pointer">
                  <Button
                    variant="destructive"
                    className="rounded-full w-10 h-10"
                  >
                    +
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new dish to {category}</DialogTitle>
                </DialogHeader>
                <div className="flex justify-between">
                  <div>
                    <p>Food name</p>
                    <Input
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>Food price</p>
                    <Input
                      value={foodPrice}
                      onChange={(e) => setFoodPrice(e.target.value)}
                    />
                  </div>
                </div>
                <p>Ingredients</p>
                <Input className="h-25" />

                <p>Food Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="mb-4 p-2 border border-gray-300 rounded"
                />

                <div className="flex justify-end">
                  <Button
                    className="w-[30%]"
                    onClick={() => {
                      handleAddDish(items[0].category?._id);
                    }}
                  >
                    Add Dish
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center h-50 w-60 rounded-2xl p-2.5 bg-gray-300"
              >
                {uploading && <p className="text-blue-600">Uploading...</p>}

                <div className="relative w-full h-30 rounded-xl bg-gray-100 overflow-hidden border border-gray-300 shadow-sm">
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Dishes;
