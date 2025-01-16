import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCart } from "../Utils/CartContext"; // Assuming CartProvider is in the same folder

const RightSidebar = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart(); // Get cart items from CartContext
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const tax = subtotal * 0.13; // 13% tax

  // Calculate total payment, or set it to 0 if no items
  const totalPayment = subtotal + tax;

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <div className="w-[25rem] p-3 flex flex-col h-full bg-white text-black rounded-[24px]">
      <div className="flex justify-between items-center">
        <h1
          onClick={() => setIsOrderOpen(false)}
          className={`text-[2rem] cursor-pointer ${isOrderOpen?'text-zinc-400':'text-black'}`}
        >
          Cart
        </h1>

        <h1
          onClick={() => setIsOrderOpen(true)}
          className={`text-[1.5rem] cursor-pointer ${!isOrderOpen?'text-zinc-400':'text-black'}`}
        >
            Order #2121 
            <button className='bg-orange-400 ml-2  text-black py-1 px-3 rounded-full text-[1.2rem]'>Making</button>
        </h1>
      </div>
      <div className="flex flex-col flex-1 justify-between h-full overflow-hidden gap-x-2 items-center">
        <div className="flex-1 relative h-full w-full mb-3">
          <div
            className={`h-full w-full absolute top-0 left-0 rightSidebar overflow-auto mb-2 flex flex-col gap-y-2 transition-all duration-300 rounded-xl ${
              !isOrderOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Check if there are no items in the cart */}
            {cartItems.length === 0 ? (
              <div className="w-full p-4 text-center text-zinc-600">
                <h1 className="text-zinc-300">No items in cart</h1>
              </div>
            ) : (
              // Map over cart items and display them
              cartItems.map((item) => (
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
                    <h1 className="font-semibold text-black">
                      {item.item.name}
                    </h1>
                    <p>
                      {item.qty}x {item.size}
                    </p>{" "}
                    {/* Display the size here */}
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
                        onClick={() =>
                          decreaseQuantity(item.item.id, item.size)
                        }
                        className="h-full cursor-pointer aspect-square rounded-full bg-white flex justify-center items-center hover:bg-zinc-300"
                      >
                        <Icon icon="ic:round-minus" />
                      </span>
                      <h1>{item.qty}</h1>{" "}
                      {/* Display quantity for this specific size */}
                      <span
                        className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 flex justify-center items-center hover:bg-primary-600"
                        onClick={() =>
                          addToCart(
                            item.item.id,
                            item.item,
                            item.size,
                            item.price
                          )
                        } // Add item to cart with selected size and price
                      >
                        <Icon
                          icon="line-md:plus"
                          className="text-white text-[1.3vw]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={`h-full w-full absolute top-0 left-0 rightSidebar overflow-auto mb-2 bg-zinc-100 p-2 flex flex-col gap-y-2 transition-all duration-300 rounded-xl ${isOrderOpen ? "translate-x-0" : "translate-x-full"}`}>
    <h1 className='text-center font-semibold text-[1.5rem]'>Order Status</h1>

    {/* Food Items Table */}
    <div className="overflow-x-auto mt-4 orderTable">
        <table className="min-w-full text-left ">
            <thead>
                <tr className="border-b">
                    <th className="p-2">Food Name</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Price</th>
                </tr>
            </thead>
            <tbody className="">
                <tr className="border-b">
                    <td className="p-2">Pizza Margherita</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">$12.99</td>
                </tr>
                <tr className="border-b">
                    <td className="p-2">Burger</td>
                    <td className="p-2">Large</td>
                    <td className="p-2">$8.99</td>
                </tr>
                <tr className="border-b">
                    <td className="p-2">Pasta</td>
                    <td className="p-2">Regular</td>
                    <td className="p-2">$10.50</td>
                </tr>

                <tr className="border-b">
                    <td className="p-2 font-bold ">Total</td>
                    <td></td>
                    <td className="p-2 font-bold">$10.50</td>
                </tr>
            </tbody>
        </table>
    </div>

    {/* Status Section */}
    <div className='mt-4'>
        <span className='font-medium'>Status:</span>
        <div className='flex justify-start flex-wrap gap-2 mt-2'>
            <button className='bg-yellow-300 text-black py-1 px-3 rounded-full opacity-50 grayscale'>Pending</button>
            <button className='bg-blue-300 text-black py-1 px-3 rounded-full opacity-50 grayscale'>Acknowledged</button>
            <button className='bg-orange-500 text-black py-1 px-3 rounded-full '>Making</button>
            <button className='bg-green-300 text-black py-1 px-3 rounded-full opacity-50 grayscale'>Ready</button>
        </div>
    </div>
</div>



        </div>

        <div className="w-full aspect-square flex flex-col self-end justify-between">
          <textarea
            className="w-full bg-zinc-100 rounded-[24px] p-3 focus:outline-none active:outline-none"
            placeholder="Any Special Requirements?"
          />
          <div className="bg-zinc-100 p-3 rounded-[24px]">
            <h1 className="text-[1.4rem]">Payment Summary</h1>
            <div className="flex flex-col w-full text-zinc-600 mb-4">
              <div className="flex justify-between items-center">
                <h1>Sub Total</h1>
                <h1>Rs {subtotal.toFixed(2)}</h1>
              </div>
              <div className="flex justify-between items-center pb-2">
                <h1>Tax (13%)</h1>
                <h1>Rs {tax.toFixed(2)}</h1>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed text-black font-semibold border-zinc-400">
                <h1>Total Payment</h1>
                <h1>Rs {totalPayment.toFixed(2)}</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-2 rounded-[20px]">
              <div
                onClick={() => setPaymentMethod("esewa")}
                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${
                  paymentMethod == "esewa"
                    ? " bg-primary-100/80 border-primary-400"
                    : "border-transparent bg-white"
                }`}
              >
                <Icon icon="duo-icons:credit-card" className="text-[1.8rem]" />
                Esewa
              </div>
              <div
                onClick={() => setPaymentMethod("cash")}
                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${
                  paymentMethod == "cash"
                    ? " bg-primary-100/80 border-primary-400"
                    : "border-transparent bg-white"
                }`}
              >
                <Icon
                  icon="solar:cash-out-bold-duotone"
                  className="text-[1.8rem]"
                />
                Cash
              </div>

              <div
                onClick={() => setPaymentMethod("paylater")}
                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${
                  paymentMethod == "paylater"
                    ? " bg-primary-100/80 border-primary-400"
                    : "border-transparent bg-white"
                }`}
              >
                <Icon icon="ic:twotone-payments" className="text-[1.8rem]" />
                Pay Later
              </div>
            </div>
          </div>

          <button className="py-3 text-center bg-primary-300 hover:bg-primary-500 w-full rounded-2xl gap-x-2 text-black flex justify-center items-center">
            <Icon icon="icon-park-twotone:buy" className="text-[1.6rem]" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
