import { useQuery } from "@tanstack/react-query";
import { getTodaysOrdersApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";
const user=await CheckLogin()

export  function useGetTodaysOrders() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['todaysorders'],
    queryFn: getTodaysOrdersApi,
    refetchInterval: user==null?false:10000

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
