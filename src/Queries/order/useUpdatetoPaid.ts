import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderToPaidApi } from "../../Api/order";

export function useUpdateOrderToPaid() {
  const queryClient=useQueryClient()

  const {
    mutate: updateOrderToPaid,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateOrderToPaidApi,
    onSuccess: () => {
      toast.success("Order Updated Successfully");
      queryClient.invalidateQueries({queryKey:['orders','todaysorders']})
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`${error.message}`);
    },
  });

  return { updateOrderToPaid, isError, data, error, isSuccess, isPending };
}
