import { Button } from "../components/Buttons";

export default function Home({ gameState, setGameState }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Button text="Start New Game" link="/start" />
    </div>
  );
}
