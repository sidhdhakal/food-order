    export default function convertBase64  (file:any) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
        reader.onload = () => resolve(reader.result); // Resolve the promise with the Base64 string
        reader.onerror = (error) => reject(error); // Reject if there's an error
      });
    };