import local from "next/font/local";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = 'http://localhost:8080';

export const createRoom = async (playerName: string): Promise<string> => {
    const apiUrl = `${BASE_URL}/create-room`;
    const playerId = uuidv4();
    const data = {
        playerId,
        playerName
    }

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
        localStorage.setItem('playerId', playerId);
        return await response.text();
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};

export const joinRoom = async (roomId: string, playerName: string): Promise<{ success: boolean }> => {
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

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to join room: ${errorMessage}`);
        }
        localStorage.setItem('playerId', playerId);
        return await response.json();
    } catch (error) {
        console.error("Error joining room:", error);
        throw error;
    }
};

