import Button from "../../Components/UI/Button";
import { useVerifyEmail } from "../../Queries/useVerifyEmail";

const VerifyEmail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");
  const urlToken = urlParams.get("token");

  const { verifyEmail, isSuccess, isPending } = useVerifyEmail();

  const handleVerifyEmail = () => {
    verifyEmail({ id: urlId, verifyToken: urlToken });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Email Verification
        </h2>
        <p className="text-center">
          {isSuccess
            ? "Your Email is Verified Successfully"
            : "Please Click the button below to verify your email Address"}
        </p>

        {isSuccess ? (
          <a href="/">
            <Button onClick={handleVerifyEmail} className="mt-4">
              Go to Home Page
            </Button>
          </a>
        ) : (
          <Button
            disabled={isPending}
            onClick={handleVerifyEmail}
            className="mt-4"
          >
            {isPending ? "Verifying Email..." : "Verify Email"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
