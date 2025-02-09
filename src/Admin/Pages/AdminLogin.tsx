import { useState } from "react";
import Background from "../../Components/UI/Background"
import Input from "../../Components/UI/Input";
import { useAdminLogin } from "../../Queries/useAdminLogin";

const AdminLogin = () => {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const {adminLogin, isPending}=useAdminLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("Please fill out both fields");
      return;
    }
    adminLogin({email, password})
  };
  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center bg-zinc-50 text-black relative">
        <Background />
        <form
        // onSubmit={handleLogin}
        className="flex flex-col gap-2 border border-zinc-200 bg-white shadow-lg p-4 z-[10] rounded-[16px] min-w-[20rem] 4xl:min-w-[22rem]"
      >
        <div className="flex flex-col justify-center items-center  mb-2">
          <p className="self-center ">Admin Login</p>
          <h1 className="font-bold text-[2.5rem] 4xl:text-[3rem] text-primary-600 leading-[1] self-center">
            Food<span className="text-primary-300">Mate</span>
          </h1>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button
        disabled={isPending}
          type="submit"
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-orange-500 self-center disabled:bg-zinc-400 text-white rounded-md mt-4"
        >
          {isPending?"logging...":'Login'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
