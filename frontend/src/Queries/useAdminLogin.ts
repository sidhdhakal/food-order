import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminLoginApi } from "../Api/auth";

export function useAdminLogin() {
  const {
    mutate: adminLogin,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: adminLoginApi,
    onSuccess: () => {
      toast.success("Signed In Successfully");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error Signing In:", error);
      toast.error(`${error.message}`);
    },
  });

  return { adminLogin, isError, data, error, isSuccess, isPending };
}
