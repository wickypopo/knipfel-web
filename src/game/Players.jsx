import { Button } from "../components/Buttons";
import { useGame } from "../provider/GameStateProvider";
import { useState } from "react";
import { scores } from "../data/data";
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  CircleStar,
  House,
  Road,
  Trophy,
  Dices,
  Check,
  X,
  Edit,
} from "lucide-react";

export default function Players() {
  const { game, setGame } = useGame();
  const [player, setPlayer] = useState("");

  function addPlayer(e) {
    e.preventDefault();
    setGame((prev) => ({
      ...prev,
      players: [
        ...prev?.players,
        {
          id: crypto.randomUUID(),
          name: player,
          hasAction: false,
          scores: [
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Einser",
              value: 1,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice1,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Zweier",
              value: 2,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice2,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Dreier",
              value: 3,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice3,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Vierer",
              value: 4,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice4,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Fünfer",
              value: 5,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice5,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Sechser",
              value: 6,
              internalValue: null,
              rolledAmount: null,
              modal: "dice",
              icon: Dice6,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Bonus",
              value: 35,
              internalValue: null,

              icon: CircleStar,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Dreierpasch",
              modal: "number",
              value: null,
              internalValue: null,
              icon: Dice6,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Viererpasch",
              modal: "number",
              value: null,
              internalValue: null,
              icon: Dice6,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Full House",
              value: 25,
              isRolled: false,
              modal: "confirm",
              icon: House,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Kleine Straße",
              value: 30,
              isRolled: false,
              modal: "confirm",
              icon: Road,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Große Straße",
              value: 40,
              isRolled: false,
              modal: "confirm",
              icon: Road,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Kniffel",
              modal: "kniffel",
              value: 50,
              internalValue: null,
              icon: Trophy,
            },
            {
              id: crypto.randomUUID(),
              ruleOut: false,
              label: "Chance",
              modal: "number",
              value: null,
              internalValue: null,
              icon: Dices,
            },
          ],
        },
      ],
    }));
    setPlayer("");
  }
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col grow gap-4">
        <div className="flex flex-col gap-2 ">
          {game.players.map((player) => (
            <div key={player.id} className="flex gap-2 max-h-[50px] relative">
              <input
                id={player.id}
                type="text"
                value={player.name}
                className="border-2 bg-white outline-none w-full p-4 rounded-full"
                disabled
              />
              <div className="flex absolute right-2 top-0 z-90 translate-y-1/6">
                <Edit size={36} className="p-2" />
                <X size={36} className="p-2" />
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 max-h-[50px]"
          onSubmit={(e) => addPlayer(e)}
        >
          <input
            type="text"
            placeholder="Player Name"
            value={player}
            onChange={(e) => setPlayer(e.currentTarget.value)}
            className="border-2 bg-white outline-none w-full p-4 rounded-full"
          />
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-full text-white aspect-square"
          >
            <Check />
          </button>
        </form>
      </div>
      <Button text="Next" link="/game" />
    </div>
  );
}
