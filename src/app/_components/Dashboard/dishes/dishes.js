import { Button } from "@/components/ui/button";
import Image from "next/image";

const DashboardDishes = (props) => {
  const { grouped, cartItems, setCartItems } = props;

    const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
        setCartItems(cartItems.map((cartItem) =>
            cartItem._id === item._id
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : cartItem
        ));
    } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    console.log("Cart Items:", cartItems);
}

  return (
    <div>
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
                <div className="absolute right-5 top-23">
                  <Button variant="destructive" onClick={() => handleAddToCart(item)}>+</Button>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-red-500 font-semibold">{item.name}</p>
                  <p>${item.price}</p>
                </div>

                <p className="line-clamp-2 pb-2 text-xs">{item.ingredients}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardDishes;
