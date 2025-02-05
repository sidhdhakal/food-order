import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addFoodApi } from "../../Api/food";

export function useAddFood() {
  const queryClient=useQueryClient()
  const {
    mutate: addFood,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: addFoodApi,
    onSuccess: () => {
      toast.success("New Food Added Successfully");
      queryClient.invalidateQueries({queryKey:['food']})
    },
    onError: (error) => {
      console.error("Error adding Food:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addFood, isError, data, error, isSuccess, isPending };
}
