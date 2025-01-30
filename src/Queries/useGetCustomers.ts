import { useQuery } from "@tanstack/react-query";
import { getCustomersApi } from "../Api/customers";

export function useGetCustomers() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomersApi,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  };
}
