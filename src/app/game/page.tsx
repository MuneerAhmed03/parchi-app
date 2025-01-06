import GameTable from "@/components/game/gameTable";
import React from "react";
import ProtectPage from "../../components/Restrictor";

const Game = () => {
  return (
    <ProtectPage>
      <GameTable />
    </ProtectPage>);
};

export default Game;
