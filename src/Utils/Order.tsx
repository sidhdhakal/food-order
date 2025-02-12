
const Order = () => {

    // Convert image to Base64
    // const convertBase64 = (file:any) => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
    //     reader.onload = () => resolve(reader.result); // Resolve the promise with the Base64 string
    //     reader.onerror = (error) => reject(error); // Reject if there's an error
    //   });
    // };
  
    // const handleSubmit = async (e:any) => {
    //   e.preventDefault(); // Prevent the default form submission behavior
  
    //   const imageInput = e.target.elements.image; // Get the image input element
    //   const file = imageInput.files[0]; // Get the selected file
  
    //   if (!file) {
    //     console.error('No image selected');
    //     return;
    //   }
  
    //   try {
    //     const baseEncoded = await convertBase64(file); // Convert image to Base64
    //     console.log(baseEncoded)
    //     const res = await fetch('http://localhost:3000/api/food/temp', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       mode: 'cors',
    //       body: JSON.stringify({ image: baseEncoded }), // Send the Base64  string
    //     });
  
    //     const data = await res.json(); // Parse the JSON response
  
    //     if (res.ok) {
    //       // Successful response
    //       
    // 
    // (data.message || 'Data stored successfully');
    //     } else {
    //       // If the server returns an error message
    //       console.error(data.message || 'Error storing data');
    //     }
    //   } catch (error) {
    //     console.error('Error sending data to the server:', error);
    //   }
    // };
  
    return (
      // <form method="post" onSubmit={handleSubmit}>
      //   <input
      //     type="file"
      //     name="image"
      //     id="image"
      //   />
      //   <button type="submit">Submit</button>
      // </form>
  
      <div className="flex text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
          Order Page
      </div>
    );
  };
  
  export default Order;