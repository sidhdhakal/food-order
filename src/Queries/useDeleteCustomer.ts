import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomerApi } from "../Api/customers";

export function useDeleteCustomer() {
  const queryClient=useQueryClient()

  const {
    mutate: deleteCustomer,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      toast.success("Customer Deleted Successfully");
      queryClient.invalidateQueries({queryKey:['customer']})

    },
    onError: (error) => {
      console.error("Error Deleting Customer:", error);
      toast.error(` ${error.message}`);
    },
  });

  return { deleteCustomer, isError, data, error, isSuccess, isPending };
}
