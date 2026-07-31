import { createContext, useContext, useState } from "react";

const GameContext = createContext(null);

export default function GameStateProvider({ children }) {
  const [game, setGame] = useState({ players: [] });
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}
export function useGame() {
  return useContext(GameContext);
}
