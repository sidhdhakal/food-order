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
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
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
    await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
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
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      console.log(data.message || "Signed In successfully");
      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}
