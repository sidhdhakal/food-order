export default function formatDateTime(dateString:string) {
    const date = new Date(dateString);
    return date.toLocaleString(); // Uses default locale and format
  }
  
  const inputDate = "2025-02-11T09:36:18.339Z";
  console.log(formatDateTime(inputDate)); // Example usage
  