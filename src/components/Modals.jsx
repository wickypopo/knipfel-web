import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useGame } from "../provider/GameStateProvider";
import { X } from "lucide-react";

function updateScore(setGame, id, getScore) {
  setGame((prevGame) => ({
    ...prevGame,
    players: prevGame.players.map((player) => ({
      ...player,
      scores: player.scores.map((score) =>
        score.id === id ? getScore(score) : score,
      ),
    })),
  }));
}

function ruleOutScore(setGame, id) {
  updateScore(setGame, id, (score) => ({
    ...score,
    internalValue: null,
    rolledAmount: null,
    kniffelCount: null,
    isRolled: false,
    ruleOut: true,
  }));
}

export function DiceModal({ isOpen, setIsOpen, id, clickedId, label, icon }) {
  const { setGame } = useGame();

  const array = [
    { icon, id: 0, active: true },
    { icon, id: 1, active: false },
    { icon, id: 2, active: false },
    { icon, id: 3, active: false },
    { icon, id: 4, active: false },
  ];

  const [dice, setDice] = useState(1);
  const [icons, setIcons] = useState(array);

  function setScore(id) {
    setIcons((prevIcons) => {
      setDice(id + 1);
      return prevIcons.map((icon) => {
        return icon.id <= id
          ? { ...icon, active: true }
          : { ...icon, active: false };
      });
    });
  }

  function confirm() {
    updateScore(setGame, id, (score) => ({
      ...score,
      internalValue: dice * score.value,
      rolledAmount: dice,
      isRolled: true,
      ruleOut: false,
    }));
  }

  function ruleOut() {
    ruleOutScore(setGame, id);
  }

  return (
    <>
      {isOpen && id === clickedId ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-[80vw] bg-white border-2 shadow-[12px_12px_0px] p-8 pt-14 z-90 rounded-4xl flex flex-col justify-center gap-4 relative">
            <X
              className="absolute top-5 right-5"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <div className="flex w-full">
              {icons.map((icon, index) => {
                const Icon = icon.icon;

                return (
                  <Icon
                    size={56}
                    key={index}
                    id={index}
                    strokeWidth={1.1}
                    onClick={() => setScore(index)}
                    fill={icon.active === true ? "#34d469" : "#dadada"}
                  />
                );
              })}
            </div>
            <span className="text-lg">
              Wie viele {label} hast du gewürfelt?
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  ruleOut();
                }}
                className="bg-red-500 border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Streichen
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  confirm();
                }}
                className="border-2 py-2 px-4 rounded-full w-full font-medium text-white bg-black"
              >
                Bestätigen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function ConfirmationModal({ isOpen, setIsOpen, id, clickedId }) {
  const { setGame } = useGame();

  function confirm() {
    updateScore(setGame, id, (score) => ({
      ...score,
      internalValue: score.value,
      rolledAmount: null,
      isRolled: true,
      ruleOut: false,
    }));
  }
  function ruleOut() {
    ruleOutScore(setGame, id);
  }

  return (
    <>
      {isOpen && id === clickedId ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-[80vw] bg-white border-2 shadow-[12px_12px_0px] p-8 pt-14 relative z-90 rounded-4xl flex flex-col justify-center gap-4">
            <X
              className="absolute top-5 right-5"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <span className="text-lg">Confirm</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  confirm();
                  setIsOpen(false);
                }}
                className="border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Bestätigen
              </button>
              <button
                onClick={() => {
                  ruleOut();
                  setIsOpen(false);
                }}
                className="bg-red-500 border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Streichen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function NumberModal({ isOpen, setIsOpen, id, clickedId }) {
  const numbersData = [
    { id: 0, value: 5, selected: false },
    { id: 1, value: 6, selected: false },
    { id: 2, value: 7, selected: false },
    { id: 3, value: 8, selected: false },
    { id: 4, value: 9, selected: false },
    { id: 5, value: 10, selected: false },
    { id: 6, value: 11, selected: false },
    { id: 7, value: 12, selected: false },
    { id: 8, value: 13, selected: false },
    { id: 9, value: 14, selected: false },
    { id: 10, value: 15, selected: false },
    { id: 11, value: 16, selected: false },
    { id: 12, value: 17, selected: false },
    { id: 13, value: 18, selected: false },
    { id: 14, value: 19, selected: false },
    { id: 15, value: 20, selected: false },
    { id: 16, value: 21, selected: false },
    { id: 17, value: 22, selected: false },
    { id: 18, value: 23, selected: false },
    { id: 19, value: 24, selected: false },
    { id: 20, value: 25, selected: false },
    { id: 21, value: 26, selected: false },
    { id: 22, value: 27, selected: false },
    { id: 23, value: 28, selected: false },
    { id: 24, value: 29, selected: false },
    { id: 25, value: 30, selected: false },
  ];

  const [numbers, setNumbers] = useState(numbersData);
  const [selection, setSelection] = useState({});

  const { setGame } = useGame();

  function select(id) {
    setNumbers((prevNumbers) => {
      const selected = prevNumbers[id];
      setSelection(selected);
      return prevNumbers.map((num) => ({
        ...num,
        selected: id === num.id ? true : false,
      }));
    });
  }

  function confirm() {
    if (selection.value === undefined) {
      return;
    }

    updateScore(setGame, id, (score) => ({
      ...score,
      internalValue: selection.value,
      rolledAmount: selection.value,
      isRolled: true,
      ruleOut: false,
    }));
  }

  function ruleOut() {
    ruleOutScore(setGame, id);
  }

  return (
    <>
      {isOpen && id === clickedId ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-[80vw] bg-white border-2 shadow-[12px_12px_0px] p-8 pt-14 relative z-90 rounded-4xl flex flex-col justify-center gap-4">
            <X
              className="absolute top-5 right-5"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <span className="text-lg">Was hast du gewürfelt?</span>
            <div className="grid grid-cols-5 gap-1">
              {numbers.map((num) => (
                <button
                  key={num.id}
                  className="size-12 rounded-full border-2 flex items-center justify-center leading-none text-xl font-bold"
                  onClick={() => select(num.id)}
                  style={
                    num.selected
                      ? { backgroundColor: "oklch(79.2% 0.209 151.711)" }
                      : null
                  }
                >
                  {num.value}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  confirm();
                }}
                className="border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Bestätigen
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  ruleOut();
                }}
                className="bg-red-500 border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Streichen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function KniffelModal({ isOpen, setIsOpen, id, clickedId }) {
  const { setGame } = useGame();
  const [count, setCount] = useState(1);
  const kniffelCounts = [1, 2, 3, 4, 5];

  function confirm() {
    updateScore(setGame, id, (score) => ({
      ...score,
      internalValue: count * score.value,
      rolledAmount: count,
      kniffelCount: count,
      isRolled: true,
      ruleOut: false,
    }));
  }

  function ruleOut() {
    ruleOutScore(setGame, id);
  }

  return (
    <>
      {isOpen && id === clickedId ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-[80vw] bg-white border-2 shadow-[12px_12px_0px] p-8 pt-14 relative z-90 rounded-4xl flex flex-col justify-center gap-4">
            <X
              className="absolute top-5 right-5"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <span className="text-lg">
              Wie viele Kniffel hast du gewürfelt?
            </span>
            <div className="grid grid-cols-5 gap-1">
              {kniffelCounts.map((num) => (
                <button
                  key={num}
                  className="size-12 rounded-full border-2 flex items-center justify-center leading-none text-xl font-bold"
                  onClick={() => setCount(num)}
                  style={
                    count === num
                      ? { backgroundColor: "oklch(79.2% 0.209 151.711)" }
                      : null
                  }
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  confirm();
                }}
                className="border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Bestätigen
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  ruleOut();
                }}
                className="bg-red-500 border-2 py-2 px-4 rounded-full w-full font-medium"
              >
                Streichen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function EndGameModal({ isOpen, players }) {
  const { setGame } = useGame();
  const placements = players
    .map((player) => ({
      id: player.id,
      name: player.name,
      totalScore: player.scores.reduce(
        (total, score) => total + (score.internalValue ?? 0),
        0,
      ),
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
  const winner = placements[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.65 },
    });
  }, [isOpen]);

  function startNewGame() {
    setGame({ players: [] });
    window.location.href = "/";
  }

  return (
    <>
      {isOpen && winner ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-[80vw] bg-white border-2 shadow-[12px_12px_0px] p-8 z-90 rounded-4xl flex flex-col justify-center gap-4">
            <span className="text-lg font-medium">
              Herzlichen Glückwunsch {winner.name}, du gewinnst!
            </span>

            <div className="flex flex-col gap-2">
              {placements.map((player, index) => (
                <div
                  key={player.id}
                  className="border-2 rounded-full py-2 px-4 flex items-center justify-between font-medium"
                >
                  <span>
                    {index + 1}. {player.name}
                  </span>
                  <span>{player.totalScore}</span>
                </div>
              ))}
            </div>

            <button
              onClick={startNewGame}
              className="border-2 py-2 px-4 rounded-full w-full font-medium"
            >
              Neues Spiel starten
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
