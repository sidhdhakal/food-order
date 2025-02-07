import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCart } from "../../Utils/CartContext";
import P from "./P";
import H1 from "./H1";

const ProductCard = ({ item }: any) => {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: number]: string | null;
  }>({});

  const handleSizeChange = (itemId: number, sizeName: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: sizeName,
    }));
  };

  const handleAddToCart = (itemId: number, itemData: any) => {
    const defaultSize = itemData.sizes[0]?.name;
    const selectedSize = selectedSizes[itemId] || defaultSize;
    
    if (selectedSize) {
      const price = getPriceBySize(itemData, selectedSize);
      
      // Ensure the size is selected in the state
      if (!selectedSizes[itemId]) {
        setSelectedSizes((prev) => ({
          ...prev,
          [itemId]: selectedSize,
        }));
      }
      
      addToCart(itemId, itemData.name, itemData.image, selectedSize, price);
    }
  };

  const handleDecreaseQuantity = (itemId: number, _: any) => {
    const defaultSize = item.sizes[0]?.name;
    const selectedSize = selectedSizes[itemId] || defaultSize;
    
    if (selectedSize) {
      decreaseQuantity(itemId, selectedSize);
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
      className="flex flex-col select-none bg-white shadow-md p-2 w-full rounded-2xl gap-y-2 
      xs:text-base sm:text-base md:text-base lg:text-base"
    >
      <div className="flex gap-x-2 flex-1 justify-center items-start">
        <img
          src={item.image}
          alt={item.name}
          className="w-1/4 aspect-square object-cover rounded-xl 
          xs:w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 "
        />
        <div className="flex-1">
         <H1>{item.name}</H1>
          <P>{item.description}</P>
          <div className="flex gap-x-3 justify-start items-center">
            <h1>Sizes:</h1>
            <div className="flex gap-x-2 mt-1">
              {item.sizes.map((size: any) => (
                <div
                  key={size.name}
                  onClick={() => handleSizeChange(item.id, size.name)}
                  className={`text-[0.9rem] sm:text-xs md:text-sm lg:text-sm px-2 py-1 rounded-full border cursor-pointer ${
                    selectedSizes[item.id] === size.name
                      ? "bg-primary-300/30 border-primary-400"
                      : "border-zinc-200"
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
        <div className="flex gap-x-2 flex-col">
          <h1 className="xs:text-md sm:text-md md:text-lg lg:text-[1.2vw] font-bold">
            <span className="text-zinc-600 font-normal xs:text-xs sm:text-xs md:text-sm">Rs</span>{" "}
            {getPriceBySize(item, selectedSizes[item.id] || defaultSize)}
          </h1>
        </div>
        <div className="w-[5.5rem] lg:w-[6.2rem] 4xl:w-[7rem] h-[2rem] lg:h-[2.3rem] 4xl:h-[2.5rem] flex justify-between items-center bg-zinc-100 rounded-full shadow-sm">
          <span
            onClick={() => handleDecreaseQuantity(item.id, item)}
            className="h-full cursor-pointer aspect-square rounded-full bg-white shadow-md flex justify-center items-center hover:bg-zinc-300"
          >
            <Icon icon="ic:round-minus" />
          </span>
          <h1 className="xs:text-xs sm:text-sm md:text-base">
            {cart[`${item.id}-${selectedSizes[item.id] || defaultSize}`]?.qty ||
              0}
          </h1>
          <span
            className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 shadow-md flex justify-center items-center hover:bg-primary-600"
            onClick={() => handleAddToCart(item.id, item)}
          >
            <Icon 
              icon="lucide:plus" 
              className="text-white xs:text-xs sm:text-sm lg:text-[1.3vw]" 
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;