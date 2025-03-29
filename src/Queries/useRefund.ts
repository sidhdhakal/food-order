import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { refundApi } from "../Api/order";

export function useRefund() {
  const queryClient=useQueryClient()

  const {
    mutate: refund,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: refundApi,
    onSuccess: () => {
      toast.success("Refund Successfully");
      queryClient.invalidateQueries({queryKey:['orders']})
  
    },
    onError: (error) => {
      console.error("Error Refunding:", error);
      toast.error(`${error.message}`);
    },
  });

  return { refund, isError, data, error, isSuccess, isPending };
}
