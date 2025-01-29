import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddCategoryApi } from "../../Api/category";

export function useAddCategory() {
  let success=false;
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
      success=true
    },
    onError: (error) => {
      console.error("Error adding Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addCategory, isError, data, error, isSuccess,success, isPending };
}
