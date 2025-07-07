import { useMutation,  useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createFeedbackApi } from "../../Api/feedback";
export function useCreateFeedback() {
  const queryClient=useQueryClient()
  
  const {
    mutate: createFeedback,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: createFeedbackApi,
    onSuccess: () => {
      toast.success("New feedback  Successfully");
      queryClient.invalidateQueries({queryKey:['feedback']})
    },
    onError: (error) => {
      console.error("Error adding feedback:", error);
      toast.error(`${error.message}`);
    },
  });

  return { createFeedback, isError, data, error, isSuccess, isPending };
}
