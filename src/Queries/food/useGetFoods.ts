import { useQuery } from "@tanstack/react-query";
import { getFoodsApi } from "../../Api/food";

export function useGetFoods() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['food'],
    queryFn: getFoodsApi,
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
