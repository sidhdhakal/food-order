export default function formatDateTime(dateString:string) {
    const date = new Date(dateString);
    return date.toLocaleString(); // Uses default locale and format
  }

  