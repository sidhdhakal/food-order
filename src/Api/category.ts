import convertBase64 from "../Utils/ConvertBase64";

export async function AddCategoryApi({
    name,
    icon
  }: {
    name: string | null;
    icon:any
  }) {

    const iconBase64=await convertBase64(icon)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/category/addcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,icon:iconBase64}),
      });
  
      const data = await res.json();
      console.log(data);
      if (data.success) {
        console.log(data.message || "New Category created successfully");
        return data;
      } else {
        throw new Error(data.message || "Error storing data");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
      throw error;
    }
  }