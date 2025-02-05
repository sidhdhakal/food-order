import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFoodAvailabilityApi } from "../../Api/food";

export function useUpdateFoodAvailability() {
  const queryClient=useQueryClient()

  const {
    mutate: updateFoodAvailability,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateFoodAvailabilityApi,
    onSuccess: () => {
      toast.success("Food Availability Updated Successfully");
      queryClient.invalidateQueries({queryKey:['food']})
  
    },
    onError: (error) => {
      console.error("Error updating Food Availability:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateFoodAvailability, isError, data, error, isSuccess, isPending };
}
