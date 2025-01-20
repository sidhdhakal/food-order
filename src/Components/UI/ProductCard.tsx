import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCart } from "../../Utils/CartContext";

const ProductCard = ({ item }: any) => {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: number]: string | null;
  }>({});

  const handleSizeChange = (itemId: number, sizeName: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: sizeName, // Update selected size for the specific item
    }));
  };

  const handleAddToCart = (itemId: number, itemData: any) => {
    const selectedSize = selectedSizes[itemId];
    if (selectedSize) {
      const price = getPriceBySize(itemData, selectedSize);
      addToCart(itemId, itemData, selectedSize, price); // Add to cart with size and price
    }
  };

  const handleDecreaseQuantity = (itemId: number, _: any) => {
    const selectedSize = selectedSizes[itemId];
    if (selectedSize) {
      decreaseQuantity(itemId, selectedSize); // Decrease quantity with size
    }
  };

  const getPriceBySize = (item: any, sizeName: string) => {
    const size = item.sizes.find((size: any) => size.name === sizeName);
    return size ? size.price : 0;
  };
  const defaultSize = item.sizes[0]?.name;
  return (
    <div
      key={item.id}
      className="flex flex-col select-none justify-center items-center bg-zinc-200/70 p-2 w-full rounded-2xl gap-y-2"
    >
      <div className="flex gap-x-2 justify-center items-start">
        <img
          src={item.image}
          alt=""
          className="w-1/4 aspect-square object-cover rounded-xl"
        />
        <div className="flex-1">
          <h1 className="text-[1.2vw] font-semibold">{item.name}</h1>
          <p className="text-[0.8vw] text-zinc-500">{item.description}</p>
          <div className="flex gap-x-3 justify-start items-center">
            <h1>Sizes:</h1>
            <div className="flex  mt-1">
              {item.sizes.map((size: any) => (
                <div
                  key={size.name}
                  onClick={() => handleSizeChange(item.id, size.name)}
                  className={`text-md px-3 py-1 rounded-full border  cursor-pointer ${
                    selectedSizes[item.id] === size.name
                      ? "bg-primary-300/30 border-primary-400 "
                      : "bg-transparent border-transparent"
                  }`}
                >
                  {size.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full items-center">
        <h1 className="text-[1.2vw] font-bold">
          <span className="text-zinc-600 font-normal">Rs</span>{" "}
          {getPriceBySize(item, selectedSizes[item.id] || defaultSize)}
        </h1>
        <div className="w-[7rem] h-[2.5rem] flex justify-between items-center bg-zinc-100 rounded-full">
          <span
            onClick={() => handleDecreaseQuantity(item.id, item)}
            className="h-full cursor-pointer aspect-square rounded-full bg-white flex justify-center items-center hover:bg-zinc-300"
          >
            <Icon icon="ic:round-minus" />
          </span>
          <h1>
            {cart[`${item.id}-${selectedSizes[item.id] || defaultSize}`]?.qty ||
              0}
          </h1>
          <span
            className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 flex justify-center items-center hover:bg-primary-600"
            onClick={() => handleAddToCart(item.id, item)}
          >
            <Icon icon="lucide:plus" className="text-white text-[1.3vw]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
