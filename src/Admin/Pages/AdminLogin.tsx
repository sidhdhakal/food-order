import { useState } from "react";
import Background from "../../Components/UI/Background"
import Input from "../../Components/UI/Input";

const AdminLogin = () => {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    //   const [loginError, setLoginError] = useState("");
  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center bg-zinc-50 text-black relative">
        <Background />
        <form
        // onSubmit={handleLogin}
        className="flex flex-col gap-2 border border-zinc-200 bg-white shadow-lg p-4 z-[10] rounded-[16px] min-w-[20rem] 4xl:min-w-[22rem]"
      >
        <div className="flex flex-col justify-center items-center  mb-2">
          <p className="self-center ">Admin Login</p>
          <h1 className="font-bold text-[2.5rem] 4xl:text-[5rem] text-primary-600 leading-[1] self-center">
            Food<span className="text-primary-300">Mate</span>
          </h1>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            value={email}
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
            onChange={(e: any) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        {/* {loginError && <p style={{ color: "red" }}>{loginError}</p>} */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-orange-500 self-center text-white rounded-md mt-4"
        >
          Login{" "}
        </button>

        {/* <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm ">
            <span className=" bg-zinc-50 ">Or Continue with</span>
          </div>
        </div> */}

        {/* <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-zinc-800">
          <div>Don't have an Account?</div>
          <a href="/signup" className="underline cursor-pointer">
            SignUp
          </a>
        </div> */}
      </form>
    </div>
  )
}

export default AdminLogin
