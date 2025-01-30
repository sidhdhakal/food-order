import { useState } from "react";
import Background from "../../Components/UI/Background";
import Button from "../../Components/UI/Button";
import Input from "../../Components/UI/Input";
import { useResetPassword } from "../../Queries/useResetPassword";

const ResetPassword=()=> {
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");
  const urlToken = urlParams.get("token");

  const { resetPassword,  isPending } = useResetPassword();


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  

  const handleResetPassword = (e:any) => {
    e.preventDefault()
    if(password !== confirmPassword)
        setError("Password doesn't match")
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError("Password must be at least 8 characters long and contain at least one number.");
    }
    resetPassword({ id: urlId, forgotPasswordToken: urlToken , password});
  };

  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center bg-zinc-50 text-black relative">
      <Background />
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col gap-2 border border-zinc-200 bg-white shadow-lg p-4 z-[10] rounded-[16px] 4xl:min-w-[22rem] max-w-[25rem]"
      >
        <div className="flex flex-col justify-center items-center  mb-2">
        
          <h1 className="font-bold text-[1.5rem] 4xl:text-[2.6rem] text-primary-600 leading-[1] self-center">
            Food<span className="text-primary-300">Mate</span>
          </h1>

          <p className="self-center ">Reset Password</p>
        </div>
        
        <div>
          <label htmlFor="password">New Password:</label>
          <Input
            type="password"
            id="password"
            value={password}
            disabled={isPending }
            onChange={(e: any) => {setPassword(e.target.value); if(error!=="") setError("")}}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            disabled={isPending }
            onChange={(e: any) =>{ setConfirmPassword(e.target.value); if(error!=="") setError("")}}
            required
            className="w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        {error!=="" && <p style={{ color: "red" }}>{error}</p>}

        <Button 
        type='submit'
        disabled={isPending }
        className="mt-4"
        >
        {isPending?'Submitting...':'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
