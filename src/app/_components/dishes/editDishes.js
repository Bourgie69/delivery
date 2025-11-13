"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EditDishIcon from "@/app/_icons/edit-icon";
import Image from "next/image";
import { useState } from "react";

const EditDishes = (props) => {
  const {
    foodName,
    food_id,
    foodImage,
    foodPrice,
    foodCategory,
    foodIngredients,
  } = props;

  const [openEdit, setOpenEdit] = useState(false);

  const [name, setName] = useState(foodName);
  const [price, setPrice] = useState(foodPrice);
  const [ingredients, setIngredients] = useState(foodIngredients);
  const [category, setCategory] = useState(foodCategory);
  const [image, setImage] = useState(foodImage);

  const handleEditDish = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/foods", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: food_id,
          name: name,
          ingredients: ingredients,
          price: price,
          image: image ? [image] : [],
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit dish");
      }
      const data = await response.json();
      console.log("Dish edited", data);
      setOpenEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute right-5 top-23">
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full h-10 w-10">
            <EditDishIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[475px] h-fit">
          <DialogHeader>
            <DialogTitle>Dishes Info</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditDish(food_id);
              setOpenEdit(false);
            }}
          >
            <div className="flex flex-col justify-between gap-10">
              <div className="flex justify-between">
                <Label htmlFor="name-1" className="text-gray-500">
                  Dish name
                </Label>
                <Input
                  className="w-60"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-between">
                <Label htmlFor="username-1" className="text-gray-500">
                  Dish category
                </Label>
                <Input
                  className="w-60"
                  defaultValue={foodCategory}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-between items-start">
                <Label htmlFor="name-1" className="text-gray-500">
                  Ingredients
                </Label>
                <Input
                  className="w-60 h-20"
                  value={ingredients}
                  onChange={(e) => {
                    setIngredients(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-between">
                <Label htmlFor="name-1" className="text-gray-500">
                  Price
                </Label>
                <Input
                  className="w-60"
                  defaultValue={foodPrice}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-between overflow-hidden">
                <Label htmlFor="name-1" className="text-gray-500">
                  Image
                </Label>
                {foodImage ? (
                  <div className="flex items-center justify-center h-30 rounded-xl bg-gray-100 overflow-hidden border border-gray-300 shadow-sm">
                    <Image
                      src={foodImage}
                      alt="Food Image"
                      height={120}
                      width={240}
                      className="object-cover object-center"
                    />
                  </div>
                ) : (
                  <div className="h-30 w-60 border rounded-2xl bg-gray-500 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDishes;
