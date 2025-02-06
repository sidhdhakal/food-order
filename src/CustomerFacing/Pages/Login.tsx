import { useState } from "react";
import Input from "../../Components/UI/Input";
import Background from "../../Components/UI/Background";
import GoogleLogin from "../Features/GoogleLogin";
import { useLogin } from "../../Queries/useLogin";
import Button from "../../Components/UI/Button";
import toast from "react-hot-toast";
import { usePasswordResetEmail } from "../../Queries/usePasswordResetEmail";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const {login, isPending}=useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("Please fill out both fields");
      return;
    }
    login({email, password})
  };

  const {passwordResetEmail, isPending:isEmailPending}=usePasswordResetEmail()

  const handleForgotPassword=()=>{
    if(email=="")
       return toast.error("Email Cannot be Empty")
    passwordResetEmail({email})

  }

  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center bg-zinc-50 text-black relative">
      <Background />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 border border-zinc-200 bg-white shadow-lg p-4 z-[10] rounded-[16px] 4xl:min-w-[22rem]"
      >
        <div className="flex flex-col justify-center items-center  mb-2">
          <p className="self-center ">Welcome to</p>
          <h1 className="font-bold text-[1.5rem] 4xl:text-[2.6rem] text-primary-600 leading-[1] self-center">
            Food<span className="text-primary-300">Mate</span>
          </h1>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            value={email}
            disabled={isPending || isEmailPending}
            onChange={(e: any) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            value={password}
            disabled={isPending || isEmailPending}
            onChange={(e: any) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}


      <button onClick={handleForgotPassword} disabled={isEmailPending} className="hover:text-primary-500 self-end mb-2 cursor-pointer disabled:text-zinc-300">Forgot password?</button>

        <Button 
        type='submit'
        disabled={isPending || isEmailPending}
        >
        {isPending?'Loggin in...':'Login'}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm ">
            <span className=" bg-zinc-50 ">Or Continue with</span>
          </div>
        </div>

        <GoogleLogin />

        <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-zinc-800">
          <div>Don't have an Account?</div>
          <a href="/signup" className="underline cursor-pointer">
            SignUp
          </a>
        </div>
      </form>
    </div>
  );
};
export default Login