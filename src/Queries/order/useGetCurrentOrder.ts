import { useQuery } from "@tanstack/react-query";
import { getCurrentOrderApi } from "../../Api/order";

export function useGetCurrentOrder() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['order'],
    queryFn: getCurrentOrderApi,
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
