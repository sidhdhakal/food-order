import convertBase64 from "../Utils/ConvertBase64";
import { Food } from "../Utils/types";

export async function addFoodApi(food:Food) {

    const image=await convertBase64(food.image)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/createfood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...food,image:image}),
      });
  
      const data = await res.json();
      if (data.success) {
        console.log(data.message || "New Food created successfully");
        return data;
      } else {
        throw new Error(data.message || "Error storing data");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }

  export async function getFoodsApi(){
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/getfoods`, {
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

export async function updateFoodApi({_id, name, description, category, sizes, available, image}:any) {
  let imageBase64=undefined
  if(image instanceof File || image instanceof FileList)
    imageBase64=await convertBase64(image)
  else{
    imageBase64=image
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/updatefood/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name,image:imageBase64, description, category, sizes, available}),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error updating Food");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}


export async function updateFoodAvailabilityApi({
  _id,
    available
}: {
  _id:string,
    available:boolean
}) {
  
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/updatefoodavailability/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ available}),
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error updating Food Availability");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}

export async function deleteFoodApi(id:any){
  try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/deletefood/${id}`, {
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