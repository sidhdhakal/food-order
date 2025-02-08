import { useMutation } from "@tanstack/react-query";
import { signUpGoogleApi } from "../Api/auth";
import toast from "react-hot-toast";
import setCookie from "../Utils/setCookie";

export function useSignUpGoogle() {
  const {
    mutate: signupGoogle,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: signUpGoogleApi,
    onSuccess: (data) => {
      console.log("Account created successfully:", data);
      setCookie(data.token)
      setTimeout(() => {
        window.location.href = "/";
      }, );
    },
    onError: (error) => {
      toast.error(error.message)
      // console.error( error);
      // setTimeout(() => {
      //   window.location.href = "/";
      // });
    },
  });

  return { signupGoogle, isError, data, error };
}
