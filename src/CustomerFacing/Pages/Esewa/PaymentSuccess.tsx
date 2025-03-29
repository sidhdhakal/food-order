import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUpdateOrderToPaid } from "../../../Queries/order/useUpdatetoPaid";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const esewaData = searchParams.get("data");
  const orderId = window.localStorage.getItem('orderId');

  const { updateOrderToPaid, isPending, isError, isSuccess } = useUpdateOrderToPaid();

  useEffect(() => {
    const updateOrderHandler = async () => {
      if (orderId) {
        try {
          await updateOrderToPaid({_id: orderId, paymentMethod: "esewa", esewaData}); 
        } catch (error) {
          console.error("Order update failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    updateOrderHandler();
  }, [updateOrderToPaid, orderId]);

  if (isPending || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-yellow-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Processing Payment...</h2>
          <p className="text-lg mb-6">We are updating your payment status. Please wait a moment.</p>
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Payment Update Failed</h2>
          <p className="text-lg mb-6">Unfortunately, your eSewa payment update was not successful. Please try again or contact support.</p>
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
          <h2 className="text-3xl font-bold mb-4">Payment Updated!</h2>
          <p className="text-lg mb-6">Payment updated for Order ID: #<strong>{orderId?.slice(-5)}</strong></p>
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

  return null;
};

export default PaymentSuccess;