import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomerApi } from "../Api/customers";

export function useDeleteCustomer() {
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
    },
    onError: (error) => {
      console.error("Error Customer Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteCustomer, isError, data, error, isSuccess, isPending };
}
