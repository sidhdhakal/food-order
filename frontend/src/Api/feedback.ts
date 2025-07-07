import { getCookie } from "../Utils/getCookie";
import { removeQuotes } from "../Utils/removeQuotes";
import CryptoJS from "crypto-js";
const token=getCookie('adminjwt')

const userToken=getCookie('foodmateuser')
 const encryptData = (data:any) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_RSA_SECRET_KEY).toString();
    };
export async function createFeedbackApi(feedbackData:any) {
    if(!userToken){
        throw new Error("You are not Logged In! Please Login to Place Order")
    }


    try {
      const encryptedData=encryptData(feedbackData)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/createfeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(userToken)}`
        },
        body: JSON.stringify({data:encryptedData})
      });
  
      const data = await res.json();
      if (data.success) {

        return data;
      } else {
        throw new Error(data.message || "Error storing data");
      }
    } catch (error) {
      console.error( error);
      throw error;
    }
  }

  export async function getMyFeedbacksApi(){

    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/getmyfeedbacks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(userToken)}`
        },
      });
  
      const data=await res.json();
      if(data.success){
        return data
      }  else {
        throw new Error(data.message || "Error fetching data");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }

  export async function getAllFeedbacksApi(){
    if(!token)
      return 
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/getallfeedbacks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(token)}`
        },
      });
      const data=await res.json();
      if(data.success){
        return data
      }  else {
        throw new Error(data.message || "Error fetching data");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }



  export async function replyToFeedbackApi({_id, reply}:any) {
   
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/replytofeedback/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(token)}`
        },
        body: JSON.stringify({_id, reply}),
      });
  
      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Error updating Category");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }