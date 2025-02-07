export default function CheckLogin() {
    const getCookie = (name:any) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? JSON.parse(match[2]) : null;
    };

    // Get the user data from the cookie
    const storedUser = getCookie('foodmateuser');
    if (storedUser) {
        return storedUser; // Return the user data if found in cookies
    }
    
    return null; // Return null if no user data found in cookies
}
