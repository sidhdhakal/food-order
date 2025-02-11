import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useCreateOrder } from "../../../Queries/order/useCreateOrder";

const PurchaseSuccess = () => {
  // const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // const transactionId = searchParams.get("uuid");
  // const amount = searchParams.get("amount");
  // const productCode = searchParams.get("code");

  const savedCartData = window.localStorage.getItem('Cart');
  
  let parsedCartData = null;
  if (savedCartData) {
    parsedCartData = JSON.parse(savedCartData);
    console.log(parsedCartData);
  }

  const { createOrder, isPending, isError, isSuccess } = useCreateOrder();

  useEffect(() => {
    const createOrderHandler = async () => {
      // const res=await fetch(`https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${productCode}&total_amount=${amount}&transaction_uuid=${transactionId}`,{
      //   mode:'no-cors'
      // })
      // console.log(res)
      if (savedCartData) {
        try {
          await createOrder(parsedCartData); 
        } catch (error) {
          console.error("Order creation failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    createOrderHandler();
  }, [createOrder, savedCartData]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-yellow-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Processing Payment...</h2>
          <p className="text-lg mb-6">We are processing your payment. Please wait a moment.</p>
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Payment Failed</h2>
          <p className="text-lg mb-6">Unfortunately, your eSewa payment was not successful. Please try again or contact support.</p>
          <a
            href="/"
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-all"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-lg mb-6">Thank you for your purchase!</p>

          {/* Render message from cart data */}
          {parsedCartData && parsedCartData.message && (
            <p className="text-lg mb-4 italic">{parsedCartData.message}</p>
          )}

          {/* Render items list */}
          {parsedCartData && parsedCartData.items && parsedCartData.items.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Purchased Items:</h3>
              <ul className="list-disc pl-5">
                {parsedCartData.items.map((item:any, index:number) => (
                  <li key={index} className="mb-2">
                    <div className="flex items-center justify-between">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <span className="ml-4">
                        {item.qty} x {item.name} - {item.size}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href="/"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return null; // in case something goes wrong
};

export default PurchaseSuccess;
