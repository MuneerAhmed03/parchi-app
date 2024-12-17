export default interface GameState {
    players: Player[];
    hands: { title: string; id: string }[][];
    currentPlayerIndex: number;
    gameStatus: string;
    winner?: string;
}

export interface PlayerView {
    playerIndex: number
    players: Player[];
    hand: { title: string; id: string }[];
    currentPlayerIndex: number;
    gameStatus: string;
    winner?: string;
}

export interface Player {
    id: string,
    name: string,
    isConnected: boolean
}
