import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost";

export const createRoom = async (
  playerName: string,
): Promise<{ roomId: string; playerId: string }> => {
  const apiUrl = `${BASE_URL}/create-room`;
  const playerId = uuidv4();
  const data = {
    playerId,
    playerName,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create room: ${errorMessage}`);
    }
    const roomId = await response.text();
    // console.log(roomId)
    return {
      roomId,
      playerId,
    };
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const joinRoom = async (
  roomId: string,
  playerName: string,
): Promise<{ roomId: string; playerId: string }> => {
  const apiUrl = `${BASE_URL}/join-room`;
  const playerId = uuidv4();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, playerId, playerName }),
    });

    if (response.status === 404) {
      throw new Error("Room not found");
    } else if (response.status === 400) {
      throw new Error("Room is full");
    } else if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to join room: ${errorMessage}`);
    }

    return {
      roomId,
      playerId,
    };
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};
