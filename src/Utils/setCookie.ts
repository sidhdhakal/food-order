export default function setCookie(userData:any){
    document.cookie = `foodmateuser=${JSON.stringify(
        userData
      )}; path=/; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}`;
}