export async function getCustomersApi(){
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/getcustomers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  export async function deleteCustomerApi(id:any){
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/deletecustomer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Error deleting data");
      }
      } catch (error) {
        console.error("Error sending data to the server:", error);
        throw error;
      }
  }

  export async function updateCustomerApi({
    _id,
    isActive
  }: {
    _id:string,
    isActive:boolean,
  }) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/updatecustomer/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive}),
      });
  
      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Error updating Customer");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }