import { getCookie } from "../Utils/getCookie";
import { removeQuotes } from "../Utils/removeQuotes";
const token=getCookie('adminjwt')


export async function getDataApi({startDate, endDate}:any){
  const start=startDate.toISOString()
  const end=endDate.toISOString()
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/getdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            'Authorization':`Bearer ${removeQuotes(token)}`
          
        },
        body: JSON.stringify({startDate:start, endDate:end})

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
