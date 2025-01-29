export async function verifyEmailApi({
  id,
  verifyToken,
}: {
  id: string | null;
  verifyToken: string | null;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, verifyToken }),
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Error storing data");
    }
  } catch (error) {
    console.error("Error sending data to the server:", error);
    throw error;
  }
}
