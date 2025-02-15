import { useQuery } from "@tanstack/react-query";
import { getDataApi } from "../Api/dashboard";

export function useGetData(dateRange:any) {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['selection'],
    queryFn: ()=>getDataApi(dateRange),
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
