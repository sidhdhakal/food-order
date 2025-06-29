import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteFoodApi } from "../../Api/food";

export function useDeleteFood() {
  const queryClient=useQueryClient()

  const {
    mutate: deleteFood,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: deleteFoodApi,
    onSuccess: () => {
      toast.success("Food Deleted Successfully");
      queryClient.invalidateQueries({queryKey:['adminfood']})

    },
    onError: (error) => {
      console.error("Error deleting Food:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteFood, isError, data, error, isSuccess, isPending };
}
