import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyEmailApi } from "../Api/verifyEmail";

export function useVerifyEmail() {
  const {
    mutate: verifyEmail,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: () => {
      toast.success("Email Verified Successfully!");
    },
    onError: (error) => {
      console.error("Error Verifying email:", error);
      toast.error(`${error.message}`);
    },
  });

  return { verifyEmail, isError, data, error, isSuccess, isPending };
}
