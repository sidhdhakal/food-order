import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../Api/auth";
import toast from "react-hot-toast";

export function useSignUp() {
  const {
    mutate: signup,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      console.log("Account created successfully:", data);
      toast.success("Account Created Successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating account:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { signup, isError, data, error, isSuccess, isPending };
}
