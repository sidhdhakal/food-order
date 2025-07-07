export default function setCookie(token:any, type:string='foodmateuser'){
    document.cookie = `${type}=${token}; path=/; expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}`;
}