import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCart } from "../Utils/CartContext";
import CartItem from "./UI/CartItem";

const RightSidebar = ({sidebarOpen}:{sidebarOpen:boolean}) => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("esewa");

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const tax = subtotal * 0.13;
  const totalPayment = subtotal + tax;

  const [isOrderOpen, _] = useState(false);

  return (
    <div className={`
      p-2 sm:p-3 lg:pl-0  bg-transparent transition-all duration-200 
      lg:translate-x-0 right-0 
      h-[calc(100vh-9rem)] sm:h-[calc(100vh-9rem)] md:h-[calc(100vh-5rem)]  
      fixed lg:sticky top-[5rem] sm:top-[5rem] 
      ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="
        max-w-[25rem]
        w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] 
        md:w-[20rem] lg:w-[20rem] 4xl:w-[25rem] shadow-md
        p-2 sm:p-3 pt-1 sm:pt-2
        flex flex-col h-full bg-white text-black rounded-[16px] sm:rounded-[24px]
      ">
        <div className="flex justify-between items-center mb-2">
          <h1 className={`
            text-xl sm:text-2xl 
            cursor-pointer ${isOrderOpen ? "text-zinc-400" : "text-black"}
          `}>
            Cart
          </h1>

          <h1 className={`
            text-base sm:text-lg 
            cursor-pointer flex justify-center items-center gap-x-1 
            ${!isOrderOpen ? "text-zinc-400" : "text-black"}
          `}>
            Order #2121
            <span className={`
              px-2 sm:px-3 py-0.5 sm:py-1 
              w-fit rounded-full text-xs sm:text-sm 
              bg-yellow-100 text-yellow-800
            `}>
              Preparing
            </span>
          </h1>
        </div>

        <div className="flex flex-col justify-between h-full overflow-hidden gap-x-2 items-center">
          <div className="flex-1 relative h-full w-full mb-2 sm:mb-3">
            <div className={`
              h-full w-full absolute top-0 left-0 
              rightSidebar overflow-auto mb-1 sm:mb-2 
              flex flex-col gap-y-1 sm:gap-y-2 
              transition-all duration-300 rounded-xl 
              ${!isOrderOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
              {cartItems.length === 0 ? (
                <div className="w-full p-2 sm:p-4 text-center text-zinc-600">
                  <h1 className="text-base sm:text-xl text-zinc-300">No items in cart</h1>
                </div>
              ) : (
                cartItems.map((item) => <CartItem item={item} />)
              )}
            </div>
          </div>

          <div className="w-full h-fit  flex flex-col gap-y-1 sm:gap-y-2 self-end justify-center">
            <textarea
              className="w-full bg-zinc-100 rounded-[16px] sm:rounded-[24px] p-2 sm:p-3 text-xs sm:text-sm focus:outline-none active:outline-none"
              placeholder="Any Special Requirements?"
            />
            <div className="bg-zinc-100 p-2 sm:p-3 rounded-[16px] sm:rounded-[24px]">
              {/* Payment Summary content remains the same */}
              <h1 className="text-sm sm:text-md lg:text-[1.4rem] mb-2">Payment Summary</h1>
              <div className="flex flex-col w-full text-zinc-600 mb-2 sm:mb-4 text-sm sm:text-sm md:text-md lg:text-lg">
                <div className="flex justify-between items-center">
                  <h1>Sub Total</h1>
                  <h1>Rs {subtotal.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center pb-1 sm:pb-2">
                  <h1>Tax (13%)</h1>
                  <h1>Rs {tax.toFixed(2)}</h1>
                </div>
                <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-dashed text-black font-semibold border-zinc-400">
                  <h1>Total Payment</h1>
                  <h1>Rs {totalPayment.toFixed(2)}</h1>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-2 rounded-[16px] sm:rounded-[20px]">
                {["esewa", "cash", "paylater"].map((method) => (
                  <div
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`
                      w-full cursor-pointer py-2 sm:py-2 
                      rounded-xl sm:rounded-2xl 
                      flex flex-col justify-center items-center 
                      gap-y-0.5 sm:gap-y-1 border 
                      text-xs sm:text-md lg:text-md 4xl:text-[1rem]
                      ${paymentMethod === method 
                        ? "bg-primary-100/80 border-primary-400" 
                        : "border-transparent bg-white"}
                    `}
                  >
                    <Icon 
                      icon={
                        method === "esewa" ? "duo-icons:credit-card" :
                        method === "cash" ?
                        "ic:twotone-payments"
                        :
                        "solar:cash-out-bold-duotone"
                      } 
                      className="text-base sm:text-[1.5rem]" 
                    />
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <button className="
              py-3 lg:py-3 text-center 
              bg-primary-300 hover:bg-primary-500 
              w-full rounded-xl sm:rounded-2xl 
              gap-x-1 sm:gap-x-2 text-black 
              flex justify-center items-center 
               text-sm sm:text-md lg:text-md 4xl:text-[1rem]
            ">
              <Icon icon="icon-park-twotone:buy" className="text-base sm:text-[1.6rem]" />
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;