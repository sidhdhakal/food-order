import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateFood() {
  const queryClient=useQueryClient()

  const {
    mutate: updateFood,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    // mutationFn: updateFoodApi,
    onSuccess: () => {
      toast.success("Category Updated Successfully");
      queryClient.invalidateQueries({queryKey:['category']})
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateFood, isError, data, error, isSuccess, isPending };
}
