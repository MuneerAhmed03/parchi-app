import { v4 as uuidv4 } from "uuid";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const joinRoom = async (
  roomId: string,
  playerId: string,
): Promise<{ success: boolean }> => {
  const apiUrl = `${BASE_URL}/join-room`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, playerId }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to join room: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};
