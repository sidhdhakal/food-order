import setCookie from "../Utils/setCookie";

export async function signUpApi({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}

export async function signUpGoogleApi({
  name,
  email,
  picture,
}: {
  name: string;
  email: string;
  picture: string;
}) {
  try {
    const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/googlesignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, picture }),
    });

      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Error storing data");
      }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}

export async function loginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      setCookie(data.token)

      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}

export async function adminLoginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      setCookie(data.token, 'adminjwt')

      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}


export async function passwordResetEmailApi({
  email,
}: {
  email: string;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sendpasswordresetlink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}


export async function resetPasswordApi({
  id,
  forgotPasswordToken,
  password
}: {
  id: string | null;
  forgotPasswordToken: string | null;
  password:string
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, forgotPasswordToken, password }),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}
