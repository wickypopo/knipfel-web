import { Check, Minus } from "lucide-react";
import { Button } from "../components/Buttons";
import {
  ConfirmationModal,
  DiceModal,
  NumberModal,
} from "../components/Modals";
import { gameTable } from "../data/data";
import { useGame } from "../provider/GameStateProvider";
import { useEffect, useState } from "react";
import { checkBonus } from "../utils/GameLogic";

export default function GameTable() {
  const { game, setGame } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    checkBonus(setGame);
  }, [game, setGame]);

  return (
    <div className="h-full w-full flex gap-2">
      <div className="grow flex flex-col justify-between">
        {gameTable.map((row) => {
          const Icon = row.icon;
          return <Icon key={row.id} size={36} />;
        })}
      </div>
      <div className="w-full flex gap-2">
        {game.players.map((player) => (
          <div
            key={player.id}
            className="w-full flex flex-col gap-2 justify-between"
          >
            <span className="absolute -translate-y-8 font-medium text-lg">
              {player.name}
            </span>
            {player.scores.map((score) => {
              let style;
              if (score.ruleOut) {
                style = { backgroundColor: "oklch(63.7% 0.237 25.331)" };
              } else if (score.isRolled) {
                style = { backgroundColor: "#0df064" };
              } else {
                style = { backgroundColor: "#ffffff" };
              }

              return (
                <>
                  {score.label === "Bonus" ? (
                    <button
                      key={score.id}
                      className="w-full h-[36px] border-2 border-gray-950 rounded-lg bg-white flex items-center justify-center font-medium text-xl leading-none"
                      style={style}
                    >
                      {" "}
                      {score.ruleOut ? <Minus /> : null}
                      {score.isRolled ? <Check /> : null}
                      {score.internalValue}
                    </button>
                  ) : (
                    <button
                      key={score.id}
                      onClick={() => {
                        setIsOpen(true);
                        setClickedId(score.id);
                        setIsDisabled(true);
                      }}
                      className="w-full h-[36px] border-2 border-gray-950 rounded-lg bg-white flex items-center justify-center font-medium text-xl leading-none"
                      disabled={isOpen}
                      style={style}
                    >
                      {" "}
                      {score.ruleOut ? <Minus /> : null}
                      {score.isRolled ? <Check /> : null}
                      {score.internalValue}
                    </button>
                  )}

                  {score.modal === "dice" ? (
                    <DiceModal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setIsDisabled={setIsDisabled}
                      id={score.id}
                      clickedId={clickedId}
                      label={score.label}
                      icon={score.icon}
                    />
                  ) : null}
                  {score.modal === "confirm" ? (
                    <ConfirmationModal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setIsDisabled={setIsDisabled}
                      id={score.id}
                      clickedId={clickedId}
                      label={score.label}
                      icon={score.icon}
                    />
                  ) : null}
                  {score.modal === "number" ? (
                    <NumberModal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setIsDisabled={setIsDisabled}
                      id={score.id}
                      clickedId={clickedId}
                      label={score.label}
                      icon={score.icon}
                    />
                  ) : null}
                </>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
