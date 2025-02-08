import { jwtDecode } from "jwt-decode";

export default function CheckLogin() {
    const getCookie = (name:any) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;  
    };

    const token = getCookie('foodmateuser');
    console.log(token);
    
    if (!token) return null; 
    
    const storedUser = jwtDecode(token);
    console.log(storedUser);

    if (storedUser) {
        return storedUser; 
    }
}
