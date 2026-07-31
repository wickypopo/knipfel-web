import { useState } from "react";
import Home from "./game/Home";
import Players from "./game/PlayersNew";
import GameTable from "./game/GameTableNew";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [gameState, setGameState] = useState({});
  return (
    <main className="h-screen w-screen p-8 pt-20 flex flex-col gap-16 bg-pink-400">
      <Link to="/" className="w-full flex justify-center">
        <img src="/Logo.svg" />
      </Link>
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/game" element={<GameTable />} />
      </Routes>
    </main>
  );
}

export default App;
