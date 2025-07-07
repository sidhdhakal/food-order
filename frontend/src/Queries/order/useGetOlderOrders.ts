import { useQuery } from "@tanstack/react-query";
import { getOlderOrdersApi} from "../../Api/order";

export function useGetOlderOrders() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['olderOrder'],
    queryFn: getOlderOrdersApi,
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
