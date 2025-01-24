import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Input from "../../Components/UI/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const responseMessage = async (response: any) => {
    const token = response.credential;
    const decoded: any = jwtDecode(token);

    const userData = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };

    document.cookie = `user=${JSON.stringify(
      userData
    )}; path=/; expires=${new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString()}`;

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(userData),
      });

      const data = await res.json(); // Parse the JSON response

      if (res.ok) {
        // Successful user creation
        console.log(data.message || "User data stored successfully");
      } else {
        // If the server returns an error message, log it
        console.error(data.message || "Error storing user data");
      }
    } catch (error) {
      console.error("Error sending user data to the server:", error);
    }

    window.location.href = "/";
  };

  const errorMessage = () => {
    console.log("An error occurred");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty email or password
    if (!email || !password) {
      setLoginError("Please fill out both fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const userData = {
          email: data.email,
          name: data.name,
          picture: data.picture,
        };
        document.cookie = `user=${JSON.stringify(
          userData
        )}; path=/; expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toUTCString()}`;

        console.log("Login successful:", data);

        window.location.href = "/";
      } else {
        setLoginError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during email/password login:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center bg-zinc-50 text-black relative">
      <img src="/Login/3.png" className="absolute bottom-0 left-0 w-full object-contain object-center"/>
      <img src="/Login/2.png" className="absolute top-0 right-0 w-[30%] aspect-square object-cover object-center"/>
      <img src="/Login/1.png" className="absolute top-0 left-0  h-full aspect-square object-cover object-center "/>
      <img src="/Login/4.png" className="absolute bottom-0 left-0 w-full object-contain object-center"/>

      <div  className="w-full h-full absolute top-0 left-0 z-[5] bg-black/10"/>
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
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-orange-500 self-center text-white rounded-md mt-4"
        >
          Login{" "}
        </button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm ">
            <span className=" bg-zinc-50 ">Or Continue with</span>
          </div>
        </div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

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

export default Login;
