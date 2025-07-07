import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export default async function CheckLogin(): Promise<User | null> {
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  const token = getCookie('foodmateuser');

  if (!token) return null; // Directly return null instead of wrapping in Promise.resolve

  try {
    const storedUser = jwtDecode<User>(token);
    return storedUser; // Return decoded user object
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Return null in case of decoding failure
  }
}
