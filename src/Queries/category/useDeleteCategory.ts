import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteCategoryApi } from "../../Api/category";

export function useDeleteCategory() {
  const {
    mutate: deleteCategory,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: DeleteCategoryApi,
    onSuccess: (data) => {
      console.log("Category Deleted successfully:", data);
      toast.success("Category Deleted Successfully");

    },
    onError: (error) => {
      console.error("Error deleting Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { deleteCategory, isError, data, error, isSuccess, isPending };
}
