import {  useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCustomerApi } from "../Api/customers";

export function useUpdateCustomer() {
    const queryClient=useQueryClient()
  const {
    mutate: updateCustomer,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateCustomerApi,
    onSuccess: () => {
      toast.success("Customer Updated Successfully");
        queryClient.invalidateQueries({queryKey:['customer']})
    },
    onError: (error) => {
      console.error("Error updating Customer:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateCustomer, isError, data, error, isSuccess, isPending };
}
