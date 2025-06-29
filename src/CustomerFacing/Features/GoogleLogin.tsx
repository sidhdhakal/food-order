import { useSignUpGoogle } from "../../Queries/useSignUpGoogle";
import { jwtDecode } from "jwt-decode";
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
    signupGoogle(userData);
  };

  const errorMessage = () => {
  };
  return <Google onSuccess={responseMessage} onError={errorMessage} />;
};

export default GoogleLogin;
