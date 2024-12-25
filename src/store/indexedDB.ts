import { openDB, IDBPDatabase } from "idb";
import { PlayerView } from "@/lib/types";

interface GameDB {
  playerViews: PlayerView;
}

const DB_NAME = "GameDB";
const DB_VERSION = 1;
const PLAYER_VIEW_KEY = "gameState";

export async function initDB(): Promise<IDBPDatabase<GameDB>> {
  return openDB<GameDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("playerViews")) {
        db.createObjectStore("playerViews");
      }
    },
  });
}

export async function savePlayerView(playerView: PlayerView): Promise<void> {
  const db = await initDB();
  await db.put("playerViews", playerView, PLAYER_VIEW_KEY);
}

export async function getPlayerView(): Promise<PlayerView | undefined> {
  const db = await initDB();
  return db.get("playerViews", PLAYER_VIEW_KEY);
}

export async function deletePlayerView(): Promise<void> {
  const db = await initDB();
  await db.delete("playerViews", PLAYER_VIEW_KEY);
}
