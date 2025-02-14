export async function getDataApi({startDate, endDate}:any){
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/getdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({startDate, endDate})

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
