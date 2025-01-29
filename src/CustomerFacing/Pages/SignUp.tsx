import { useState } from "react";
import Input from "../../Components/UI/Input";
import { useSignUp } from "../../Queries/useSignUp";
import GoogleLogin from "../Features/GoogleLogin";
import Button from "../../Components/UI/Button";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isPending } = useSignUp(); 

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const nameRegex=/^[A-Za-z\s]+$/
    if(!nameRegex.test(name))
      return toast.error("Name should not contain numbers or special characters")

    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error("Password must be at least 8 characters long and contain at least one number.");
    }
    signup({ name, email, password });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-50 text-black relative">
      <img
        src="/Login/3.png"
        className="absolute bottom-0 left-0 w-full object-contain object-center"
      />
      <img
        src="/Login/2.png"
        className="absolute top-0 right-0 w-[30%] aspect-square object-cover object-center"
      />
      <img
        src="/Login/1.png"
        className="absolute top-0 left-0  h-full aspect-square object-cover object-center "
      />
      <img
        src="/Login/4.png"
        className="absolute bottom-0 left-0 w-full object-contain object-center"
      />
      <div className="w-full h-full absolute top-0 left-0 z-[5] bg-black/10" />

      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-2 border border-zinc-300 p-4 bg-white z-[10]  shadow-lg rounded-[16px] 4xl:min-w-[25rem]"
      >
        <div className="flex flex-col justify-center items-center mb-2">
          <p className="self-center ">Welcome to</p>
          <h1 className="font-bold text-[1.5rem] 4xl:text-[2.6rem] text-primary-600 leading-[1] self-center">
            Food<span className="text-primary-300">Mate</span>
          </h1>
        </div>
        <div>
          <label htmlFor="name">Full Name:</label>
          <Input
            type="text"
            id="name"
            disabled={isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        {/* {loginError && <p style={{ color: "red" }}>{loginError}</p>} */}

        <Button 
         type="submit"
         disabled={isPending}
        >
        {isPending?'Signing Up...':'Signup'}
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

        <div  className="flex gap-2 justify-center text-sm mt-2 px-2 text-zinc-800">
          <div>Already have an Account?</div>
          <a href="/login" className="underline cursor-pointer">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
