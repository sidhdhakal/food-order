import { useMutation,  useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrderApi } from "../../Api/order";
import { useCart } from "../../Utils/CartContext";
export function useCreateOrder() {
  const queryClient=useQueryClient()
    const { clearCart} = useCart();
  
  const {
    mutate: createOrder,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast.success("New Order Placed Successfully");
      queryClient.invalidateQueries({queryKey:['food']})
      clearCart()
      window.localStorage.setItem('Cart', "")
    },
    onError: (error) => {
      console.error("Error adding Order:", error);
      toast.error(`${error.message}`);
    },
  });

  return { createOrder, isError, data, error, isSuccess, isPending };
}
