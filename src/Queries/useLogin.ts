import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../Api/auth";
import toast from "react-hot-toast";

export function useLogin() {
  const {
    mutate: login,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Signed In successfully:", data);
      toast.success("Signed In Successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error Signing In:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { login, isError, data, error, isSuccess, isPending };
}
