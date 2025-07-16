import { API_BASE_URL } from "../Overall/IpConfig";

export const addPoints = async (email: string, pointsToAdd: number) => {
  if (!email) return;

  try {
    await fetch(`${API_BASE_URL}/users/addPoints/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pointsToAdd }),
    });
  } catch (error) {
    console.warn("Failed to add points:", error);
  }
};
