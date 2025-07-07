import { useQuery } from "@tanstack/react-query";
import {  getNotPaidOrdersApi } from "../../Api/order";

export function useGetNotPaidOrders() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['notpaidorders'],
    queryFn: getNotPaidOrdersApi,
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
