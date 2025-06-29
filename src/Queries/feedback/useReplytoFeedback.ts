import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { replyToFeedbackApi } from "../../Api/feedback";

export function useReplytoFeedback() {
  const queryClient=useQueryClient()

  const {
    mutate: replyToFeedback,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: replyToFeedbackApi,
    onSuccess: () => {
      toast.success("Reply sent Successfully");
      queryClient.invalidateQueries({queryKey:['feedbacks']})
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`${error.message}`);
    },
  });

  return { replyToFeedback, isError, data, error, isSuccess, isPending };
}
