import CheckLogin from "../Utils/CheckLogin";
import { getCookie } from "../Utils/getCookie";
import { removeQuotes } from "../Utils/removeQuotes";
const token=getCookie('adminjwt')

const user=CheckLogin()

export async function createOrderApi({items,message, paymentMethod}:any) {
    console.log(items, paymentMethod)
    if(!user){
        throw new Error("You are not Logged In! Please Login to Place Order")
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/createorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   'Authorization':`Bearer ${removeQuotes(token)}`
        },
        body: JSON.stringify({email:user.email, items,message, paymentMethod})
      });
  
      const data = await res.json();
      if (data.success) {
        console.log(data.message || "New Food created successfully");
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
    if(user.email==null)
      return 
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getcurrentorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email:user.email})
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email:user.email})
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
  
  export async function getOlderOrdersApi(){

    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/getolderorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email:user.email})
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




  export async function updateOrderApi({_id, status}:any) {
   
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/updatecurrentorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${removeQuotes(token)}`
        },
        body: JSON.stringify({_id, status}),
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