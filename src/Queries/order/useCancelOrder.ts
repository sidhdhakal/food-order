import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrderApi } from "../../Api/order";

export function useCancelOrder() {
  const queryClient=useQueryClient()

  const {
    mutate: cancelOrder,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      toast.success("Order Cancelled Successfully");
      queryClient.invalidateQueries({queryKey:['orders','todaysorders']})
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`${error.message}`);
    },
  });

  return { cancelOrder, isError, data, error, isSuccess, isPending };
}
