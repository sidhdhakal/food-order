import CryptoJS from "crypto-js";
export default function createSignature(message:string) {
  const hash = CryptoJS.HmacSHA256(message,"8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
}