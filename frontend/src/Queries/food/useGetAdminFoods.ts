import { useQuery } from "@tanstack/react-query";
import { getAdminFoodsApi } from "../../Api/food";

export function useGetAdminFoods() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['adminfood'],
    queryFn: getAdminFoodsApi,
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
