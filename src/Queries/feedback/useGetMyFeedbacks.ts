import { useQuery } from "@tanstack/react-query";
import { getMyFeedbacksApi } from "../../Api/feedback";

export function useGetMyFeedbacks() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['userfeedback'],
    queryFn: getMyFeedbacksApi,
    // refetchInterval: 2000
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
