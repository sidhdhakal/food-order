import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteCategoryApi } from "../../Api/category";

export function useDeleteCategory() {
  const queryClient=useQueryClient()

  const {
    mutate: deleteCategory,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: DeleteCategoryApi,
    onSuccess: () => {
      toast.success("Category Deleted Successfully");
      queryClient.invalidateQueries({queryKey:['category']})

    },
    onError: (error) => {
      console.error("Error deleting Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteCategory, isError, data, error, isSuccess, isPending };
}
