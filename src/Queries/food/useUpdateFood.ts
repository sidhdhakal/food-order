import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFoodApi } from "../../Api/food";

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
    mutationFn: updateFoodApi,
    onSuccess: () => {
      toast.success("Food Updated Successfully");
      queryClient.invalidateQueries({queryKey:['adminfood']})
  
    },
    onError: (error) => {
      console.error("Error updating Food:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateFood, isError, data, error, isSuccess, isPending };
}
