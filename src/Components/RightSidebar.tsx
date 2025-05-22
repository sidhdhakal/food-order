import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useCart } from "../Utils/CartContext";
import CartItem from "./UI/CartItem";
import Button from "./UI/Button";
import { useCreateOrder } from "../Queries/order/useCreateOrder";
import OrderStatus from "./OrderStatus";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import CheckLogin from "../Utils/CheckLogin";
import { useGetCurrentOrder } from "../Queries/order/useGetCurrentOrder";
import { useGetNotPaidOrders } from "../Queries/order/useGetNotPaidOrders";
// import createSignature from "../Utils/createSignature";

const RightSidebar = ({sidebarOpen, setIsActiveComponent}:{sidebarOpen:boolean, setIsActiveComponent:any}) => {
  const { cart} = useCart();
  const {createOrder, isPending}=useCreateOrder();
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [message, setMessage]=useState('')

  const { data:CurrentOrder} = useGetCurrentOrder();
  const { data:notPaidOrders} = useGetNotPaidOrders();

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  // const tax = subtotal * 0.13;
  const totalPayment = subtotal ;


  const [isOrderOpen, _] = useState(false);

 const handlePlaceOrder = async () => {
  const user = await CheckLogin();
  const itemsArray = Object.values(cart);

  if (itemsArray.length === 0) return;

  if (!user) {
    toast.error('Please login to place Order!');
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
    return; 
  }

  const items = itemsArray.map((item, index) => {
    const itemId = Object.keys(cart)[index].split('-')[0];
    return { ...item, itemId };
  });

  if (paymentMethod === 'esewa') {
    return handlePayButtonClick(items);
  }

  createOrder({ items, message, paymentMethod });
};



  async function handlePayButtonClick(items:any) {
    window.localStorage.setItem('Cart',JSON.stringify({items, message, paymentMethod}))
    try {
          const uuid=new Date().getTime().toString().slice(-6);
    const jsonData:any = {
          "amount": totalPayment.toFixed(2).toString(),
          "failure_url": `${import.meta.env.VITE_URL}/esewa/purchase_fail`,
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "product_code": "EPAYTEST",
          "signature": "",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
       
          "success_url": `${import.meta.env.VITE_URL}/esewa/purchase_success`,
          "tax_amount": "0",
          "total_amount": totalPayment.toFixed(2).toString(),
          "transaction_uuid":uuid
    };
    let url="https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    
    const message = "total_amount=" + jsonData.total_amount + ",transaction_uuid=" + jsonData.transaction_uuid + ",product_code=" + jsonData.product_code;
    const signature = createSignature(message);
    jsonData.signature = signature;
    
    
    const form = document.createElement("form");
    for (const key in jsonData) {
          const field = document.createElement("input");
          field.setAttribute("type", "hidden");
          field.setAttribute("name", key);
          field.setAttribute("value", jsonData[key]);
          form.appendChild(field);
    }
    
    form.setAttribute("method", "post");
    form.setAttribute("action", url); 
    document.body.appendChild(form);
    form.submit();

    } catch (error) {
          toast.error("Something Unexpected Happen! Please Try Again later")                 
    } finally{
    }
}

function createSignature(message:string) {
  const hash = CryptoJS.HmacSHA256(message,"8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
}


  return (
    <div className={`
       lg:p-3 lg:pl-0  bg-transparent transition-all duration-200 
      lg:translate-x-0 right-0 
      h-[calc(100vh-8.5rem)] sm:h-[calc(100vh-8.5rem)] md:h-[calc(100vh-5rem)]  
      fixed lg:sticky top-[5rem] 
      ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="
        max-w-[25rem]
        w-[calc(100vw-1rem)]  sm:w-[calc(100vw-2rem)] 
        md:w-[20rem] lg:w-[20rem] 4xl:w-[25rem] shadow-md
        p-3 sm:p-3  sm:pt-2
        flex flex-col h-full bg-white text-black  lg:rounded-[24px]
      ">
        <div className="flex justify-between items-start lg:mb-2">
          <h1 className={`
            text-xl sm:text-2xl 
            cursor-pointer ${isOrderOpen ? "text-zinc-400" : "text-black"}
          `}>
            Cart
          </h1>

          <OrderStatus setIsActiveComponent={setIsActiveComponent} />
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
                cartItems.map((item, index) => <CartItem key={index} item={item} />)
              )}
            </div>
          </div>

          <div className="w-full h-fit  flex flex-col gap-y-1 sm:gap-y-2 self-end justify-center">
            <textarea
            value={message}
            onChange={(e:any)=>setMessage(e.target.value)}
              className="w-full bg-zinc-100 rounded-[16px] sm:rounded-[24px] p-2 sm:p-3 text-xs sm:text-sm focus:outline-none active:outline-none"
              placeholder="Any Special Requirements?"
            />
            <div className="bg-zinc-100 p-2 sm:p-3 rounded-[16px] sm:rounded-[24px]">
              <h1 className="text-sm sm:text-md lg:text-[1.4rem] mb-2">Payment Summary</h1>
              <div className="flex flex-col w-full text-zinc-600 mb-2 sm:mb-4 text-sm sm:text-sm md:text-md lg:text-lg">
                <div className="flex justify-between items-center mb-2">
                  <h1>Sub Total</h1>
                  <h1>Rs {subtotal.toFixed(2)}</h1>
                </div>
                {/* <div className="flex justify-between items-center pb-1 sm:pb-2">
                  <h1>Tax (13%)</h1>
                  <h1>Rs {tax.toFixed(2)}</h1>
                </div> */}
                <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-dashed text-black font-semibold border-zinc-400">
                  <h1>Total Payment</h1>
                  <h1>Rs {totalPayment.toFixed(2)}</h1>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-2 rounded-[16px] sm:rounded-[20px]">
                {["esewa", "cash", "Not Paid"].map((method) => (
                  <button
                    disabled={method=='Not Paid' && notPaidOrders?.doc?.length>=2}
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`
                      
                      w-full cursor-pointer py-2 sm:py-2 
                      rounded-xl sm:rounded-2xl 
                      flex flex-col justify-center items-center 
                      gap-y-0.5 sm:gap-y-1 border 
                      capitalize
                      text-xs sm:text-md lg:text-md 4xl:text-[1rem]
                      ${paymentMethod === method 
                        ? "bg-primary-100/80 border-primary-400" 
                        : "border-transparent bg-white"}
                       ${(method=='Not Paid' && notPaidOrders?.doc?.length>=2)?'text-gray-500':''}
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
                      className={`text-base sm:text-[1.5rem]  ${(method=='Not Paid' && notPaidOrders?.doc?.length>=2)?'text-gray-500':''}`}
                    />
                    {method=='Not Paid'?'Pay later':method}
                  </button>
                ))}
              </div>
            </div>
            <Button
            disabled={isPending || CurrentOrder?.doc?.length>=2}
            onClick={handlePlaceOrder}
            className="
            py-3 lg:py-3 text-center 
            bg-primary-300 hover:bg-primary-500 
            w-full rounded-xl sm:rounded-2xl 
            gap-x-1 sm:gap-x-2 !text-black 
            flex justify-center items-center 
             text-sm sm:text-md lg:text-md 4xl:text-[1rem] disabled:bg-zinc-300
          ">
            <Icon icon="icon-park-twotone:buy" className="text-base sm:text-[1.6rem]" />
            {CurrentOrder?.doc?.length>=2?'You have 2 Pending Order':isPending?'Placing Order...':'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;