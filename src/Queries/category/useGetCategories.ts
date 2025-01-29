import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../../Api/category";

export function useGetCategory() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['category'],
    queryFn: getCategoriesApi,
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
