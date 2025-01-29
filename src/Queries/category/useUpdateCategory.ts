import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {  UpdateCategoryApi } from "../../Api/category";

export function useUpdateCategory() {
  const {
    mutate: updateCategory,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: UpdateCategoryApi,
    onSuccess: () => {
      toast.success("Category Updated Successfully");
  
    },
    onError: (error) => {
      console.error("Error updating Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { updateCategory, isError, data, error, isSuccess, isPending };
}
