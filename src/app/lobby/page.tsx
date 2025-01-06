import LobbyComponent from "@/components/lobby/lobby-component";
import React from "react";
import ProtectPage from "../../components/Restrictor";

const Lobby = () => {
  return (
    <ProtectPage>
      <LobbyComponent />
    </ProtectPage>
  );
};

export default Lobby;
