import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrderApi } from "../../Api/order";

export function useCreateOrder() {
  const queryClient=useQueryClient()
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
    },
    onError: (error) => {
      console.error("Error adding Order:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { createOrder, isError, data, error, isSuccess, isPending };
}
