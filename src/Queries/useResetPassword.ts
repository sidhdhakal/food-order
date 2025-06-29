import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../Api/auth";

export function useResetPassword() {
  const {
    mutate: resetPassword,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password Reset Successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error Verifying email:", error);
      toast.error(`${error.message}`);
    },
  });

  return { resetPassword, isError, data, error, isSuccess, isPending };
}
