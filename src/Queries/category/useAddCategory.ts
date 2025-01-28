import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddCategoryApi } from "../../Api/category";

export function useAddCategory() {
  const {
    mutate: addCategory,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: AddCategoryApi,
    onSuccess: (data) => {
      console.log("New Category Added successfully:", data);
      toast.success("New Category Added Successfully");
    //   setTimeout(() => {
    //     window.location.href = "/login";
    //   }, 2000);
    },
    onError: (error) => {
      console.error("Error adding Category:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { addCategory, isError, data, error, isSuccess, isPending };
}
