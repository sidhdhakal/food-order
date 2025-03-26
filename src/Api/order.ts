import { getCookie } from "../Utils/getCookie";
import { removeQuotes } from "../Utils/removeQuotes";
import CryptoJS from "crypto-js";
const token=getCookie('adminjwt')

const userToken=getCookie('foodmateuser')
 const encryptData = (data:any) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_RSA_SECRET_KEY).toString();
    };
export async function createOrderApi({items,message, paymentMethod, esewaData}:any) {
    if(!userToken){
        throw new Error("You are not Logged In! Please Login to Place Order")
    }
    try {
      const encryptedData=encryptData({items, message, paymentMethod})
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(userToken)}`
        },
        body: JSON.stringify({data:encryptedData, esewaData})
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

  export async function getAllOrdersApi(){

    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getallorders`, {
        method: "get",
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

  export async function getCurrentOrderApi(){
    if(!userToken)
      return 
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getcurrentorder`, {
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



  export async function getTodaysOrdersApi(){

    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/gettodaysorders`, {
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
        // throw new Error(data.message || "Error fetching data");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }
  
  export async function getOlderOrdersApi(){

    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getolderorders`, {
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
      // console.error( error);
      throw error;
    }
  }




  export async function updateOrderApi({_id, status, message}:any) {
   
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/updatecurrentorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(token)}`
        },
        body: JSON.stringify({_id, status, message}),
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



  export async function cancelOrderApi({_id, message}:any) {
   
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/cancelorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(userToken)}`
        },
        body: JSON.stringify({_id,  message}),
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