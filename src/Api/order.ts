import CheckLogin from "../Utils/CheckLogin";


export async function createOrderApi({items, paymentMethod}:any) {
    console.log(items, paymentMethod)
    const user=CheckLogin()
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
        body: JSON.stringify({email:user.email, items, paymentMethod})
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