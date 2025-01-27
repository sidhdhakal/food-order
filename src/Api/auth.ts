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
    console.log(data);
    if (data.success) {
      console.log(data.message || "Account created successfully");
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
  console.log(picture);
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, picture }),
    });

    //   const data = await res.json();

    //   if (res.ok) {
    //     console.log(data.message || "Account created successfully");
    //     // return data;
    //   } else {
    //     // throw new Error(data.message || "Error storing data");
    //   }
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
    console.log(data);
    if (data.success) {
      setCookie({name:data.user.name, email})

      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}
