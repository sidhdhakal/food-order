import { Icon } from "@iconify/react/dist/iconify.js";
import { useCart } from "../../Utils/CartContext";

const CartItem = ({ item }: any) => {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart(); // Get cart items from CartContext

  return (
    <div
      key={item.item.id + item.size}
      className="w-full p-2 group flex select-none bg-zinc-50 rounded-xl"
    >
      <div className="rounded-xl overflow-hidden w-1/4 aspect-square relative">
        <span
          className="h-[50%] cursor-pointer absolute top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full bg-red-500/70 flex justify-center items-center hover:bg-red-600"
          onClick={() => removeFromCart(item.item.id, item.size)} // Add item to cart
        >
          <Icon
            icon="icon-park-twotone:delete-one"
            className="text-white text-[1.5rem]"
          />
        </span>
        <img
          src={item.item.image}
          className="w-full h-full object-cover"
          alt={item.item.name}
        />
      </div>
      <div className="flex-1 text-zinc-600 pl-2">
        <h1 className="font-semibold text-black">{item.item.name}</h1>
        <p>
          {item.qty}x {item.size}
        </p>{" "}
      </div>

      <div className="flex flex-col justify-between items-end">
        <h1>
          Rs{" "}
          <span className="font-semibold text-black">
            {(item.price * item.qty).toFixed(2)}
          </span>
        </h1>{" "}
        {/* Display the price here */}
        <div className="w-[7rem] h-[2.5rem] flex justify-between items-center bg-zinc-100 rounded-full">
          <span
            onClick={() => decreaseQuantity(item.item.id, item.size)}
            className="h-full cursor-pointer aspect-square rounded-full bg-white flex justify-center items-center hover:bg-zinc-300"
          >
            <Icon icon="ic:round-minus" />
          </span>
          <h1>{item.qty}</h1> {/* Display quantity for this specific size */}
          <span
            className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 flex justify-center items-center hover:bg-primary-600"
            onClick={() =>
              addToCart(item.item.id, item.item, item.size, item.price)
            } // Add item to cart with selected size and price
          >
            <Icon icon="line-md:plus" className="text-white text-[1.3vw]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
