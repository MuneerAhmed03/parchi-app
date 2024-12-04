import { v4 as uuidv4 } from "uuid";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createRoom = async (): Promise<string> => {
  const apiUrl = `${BASE_URL}/create-room`;
  const playerId = uuidv4();

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create room: ${errorMessage}`);
    }

    return await response.text(); // Room ID as a plain string
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
