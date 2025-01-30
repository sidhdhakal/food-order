import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { passwordResetEmailApi } from "../Api/auth";

export function usePasswordResetEmail() {
  const {
    mutate: passwordResetEmail,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: passwordResetEmailApi,
    onSuccess: () => {
      toast.success("We have sent a Password Reset Link to your Email! Please Check your email");
    },
    onError: (error) => {
      console.error("Error Sending Password Reset Link:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { passwordResetEmail, isError, data, error, isSuccess, isPending };
}
