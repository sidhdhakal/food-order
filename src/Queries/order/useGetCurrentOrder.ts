import { useQuery } from "@tanstack/react-query";
import { getCurrentOrderApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";

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
