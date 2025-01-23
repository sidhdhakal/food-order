import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Input from "../Components/UI/Input";

const SignUp = () => {
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

  // Handle email/password login
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
    <div className="w-full h-screen flex justify-center items-center bg-zinc-50 text-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 border border-zinc-300 p-4 rounded-[16px]"
      >
        <h1 className="self-center uppercase font-semibold text-[1.8rem]">User Signup</h1>
        <div>
          <label htmlFor="name">Full Name:</label>
          <Input
            type="text"
            id="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                              <div>Already have an Account?</div>
                              <a href="/login" className="underline cursor-pointer">Sign In
                              </a>
                        </div>
      </form>

    </div>
  );
};

export default SignUp;
