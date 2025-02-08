import { jwtDecode } from "jwt-decode";
// Define your user type based on the structure of the JWT token
interface User {
    id: string;
    name: string;
    email: string;
    picture?: string; // Optional if it's not always present
  }

  
export default function CheckLogin() {
    const getCookie = (name:any) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;  
    };

    const token = getCookie('foodmateuser');
    console.log(token);
    
    if (!token) return Promise.resolve(null); // Resolve with null if no token
    
    const storedUser = jwtDecode<User>(token);
    console.log(storedUser);

    if (storedUser) {
        return Promise.resolve(storedUser); // Return a resolved promise with user data
    }

    return Promise.resolve(null); // In case something goes wrong
}
