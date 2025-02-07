import { useQuery } from "@tanstack/react-query";
import { getAllOrdersApi } from "../../Api/order";

export function useGetAllOrders() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrdersApi,
    refetchInterval: 2000
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
}
