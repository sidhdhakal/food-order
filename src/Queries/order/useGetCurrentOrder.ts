import { useQuery } from "@tanstack/react-query";
import { getCurrentOrderApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";
const user=await CheckLogin()
export function useGetCurrentOrder() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getCurrentOrderApi,
    refetchInterval:user==null?false:2000
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
