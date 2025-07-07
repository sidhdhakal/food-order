import { useQuery } from "@tanstack/react-query";
import { getRecommendedFoodsApi } from "../../Api/food";

export function getRecommendedFoods() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['recommendedFoods'],
    queryFn: getRecommendedFoodsApi,
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
