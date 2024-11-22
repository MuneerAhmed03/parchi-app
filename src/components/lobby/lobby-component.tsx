import React from "react";
import UserCard from "./user-card";
import Header from "./header";
import StatusBar from "./status-bar";

export const players = [
  { id: 1, name: "Avi", avtar: "/user-avtars/avtar1.png", ready: false },
  { id: 2, name: "Paneer", avtar: "/user-avtars/avtar2.png", ready: true },
  { id: 3, name: "Thevy", avtar: "/user-avtars/avtar3.png", ready: false },
  { id: 4, name: "Aayush", avtar: "/user-avtars/avtar4.png", ready: false },
];

const LobbyComponent = () => {
  const getRandomTilt = () => Math.random() * 4 - 2; // Random angle between -2 and 2 degrees

  return (
    <div className="bg-[#ffa726] py-5 flex flex-col justify-around gap-5 overflow-hidden w-screen h-screen">
      {/* Header */}
      <Header />
      {/* User Cards */}
      <div className="grid grid-cols-2 gap-5 w-fit mx-auto">
        {players.map((player) => (
          <UserCard key={player.id} playerName={player.name} playerAvtar={player.avtar} playerStatus={player.ready} tilt={getRandomTilt()} />
        ))}
      </div>
      {/* Progress Bar */}
      <StatusBar />
    </div>
  );
};

export default LobbyComponent;
