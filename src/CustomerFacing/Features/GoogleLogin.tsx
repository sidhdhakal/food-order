import { useSignUpGoogle } from "../../Queries/useSignUpGoogle";
import { jwtDecode } from "jwt-decode";
import setCookie from "../../Utils/setCookie";
import { GoogleLogin as Google } from "@react-oauth/google";

const GoogleLogin = () => {

  const { signupGoogle } = useSignUpGoogle();

  const responseMessage = async (response: any) => {
    const token = response.credential;
    const decoded: any = jwtDecode(token);

    const userData = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };
    setCookie(userData);
    signupGoogle(userData);
  };

  const errorMessage = () => {
    console.log("An error occurred");
  };
  return <Google onSuccess={responseMessage} onError={errorMessage} />;
};

export default GoogleLogin;
