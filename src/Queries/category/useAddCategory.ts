import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddCategoryApi } from "../../Api/category";

export function useAddCategory() {
  const queryClient=useQueryClient()
  const {
    mutate: addCategory,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: AddCategoryApi,
    onSuccess: () => {
      toast.success("New Category Added Successfully");
      queryClient.invalidateQueries({queryKey:['category']})
    },
    onError: (error) => {
      console.error("Error adding Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addCategory, isError, data, error, isSuccess, isPending };
}
