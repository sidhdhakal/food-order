import { Icon } from "@iconify/react/dist/iconify.js";
import { useCart } from "../../Utils/CartContext";

const CartItem = ({ item }: any) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart();

  return (
    <div
      key={item.item.id + item.size}
      className="w-full p-2 group flex select-none bg-zinc-50 shadow-sm border border-zinc-300 rounded-xl
      xs:text-base sm:text-base md:text-base lg:text-base"
    >
      <div className="rounded-xl overflow-hidden w-1/4 aspect-square relative
      xs:w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4">
        <span
          className="h-[50%] cursor-pointer absolute top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full bg-red-500/70 flex justify-center items-center hover:bg-red-600"
          onClick={() => removeFromCart(item.item.id, item.size)}
        >
          <Icon
            icon="icon-park-twotone:delete-one"
            className="text-white xs:text-base sm:text-lg md:text-xl lg:text-[1.5rem]"
          />
        </span>
        <img
          src={item.item.image}
          className="w-full h-full object-cover"
          alt={item.item.name}
        />
      </div>
      <div className="flex-1 text-zinc-600 pl-2">
        <h1 className="font-semibold text-black xs:text-base sm:text-lg md:text-xl lg:text-[1vw]">
          {item.item.name}
        </h1>
        <p className="xs:text-xs sm:text-sm md:text-base">
          {item.qty}x ({item.size})
        </p>
      </div>

      <div className="flex flex-col justify-between items-end">
        <h1 className="xs:text-sm sm:text-base md:text-lg lg:text-[1.2vw]">
          Rs{" "}
          <span className="font-semibold text-black">
            {(item.price * item.qty).toFixed(2)}
          </span>
        </h1>
        <div className="w-[5.5rem] lg:w-[6.2rem] 4xl:w-[7rem] h-[2rem] lg:h-[2.3rem] 4xl:h-[2.5rem] flex justify-between items-center bg-white shadow-sm rounded-full">
          <span
            onClick={() => decreaseQuantity(item.item.id, item.size)}
            className="h-full cursor-pointer aspect-square rounded-full bg-white shadow-md flex justify-center items-center hover:bg-zinc-300"
          >
            <Icon icon="ic:round-minus" />
          </span>
          <h1 className="xs:text-xs sm:text-sm md:text-base">{item.qty}</h1>
          <span
            className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 shadow-md flex justify-center items-center hover:bg-primary-600"
            onClick={() =>
              addToCart(item.item.id, item.item, item.size, item.price)
            }
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

export default CartItem;