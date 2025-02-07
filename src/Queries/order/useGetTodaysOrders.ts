import { useQuery } from "@tanstack/react-query";
import { getTodaysOrdersApi } from "../../Api/order";

export function useGetTodaysOrders() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['todaysorder'],
    queryFn: getTodaysOrdersApi,
    refetchInterval: 10000

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
