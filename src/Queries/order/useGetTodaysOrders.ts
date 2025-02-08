import { useQuery } from "@tanstack/react-query";
import { getTodaysOrdersApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";

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
    refetchInterval: CheckLogin()==null?false:2000

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
