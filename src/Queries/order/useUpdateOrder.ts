import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderApi } from "../../Api/order";

export function useUpdateOrder() {
  const queryClient=useQueryClient()

  const {
    mutate: updateOrder,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: () => {
      toast.success("Order Updated Successfully");
      queryClient.invalidateQueries({queryKey:['orders','todaysorders']})
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`${error.message}`);
    },
  });

  return { updateOrder, isError, data, error, isSuccess, isPending };
}
