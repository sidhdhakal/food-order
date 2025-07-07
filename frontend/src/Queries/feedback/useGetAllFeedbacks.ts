import { useQuery } from "@tanstack/react-query";
import { getAllFeedbacksApi } from "../../Api/feedback";

export function useGetAllFeedbacks() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: getAllFeedbacksApi,
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
