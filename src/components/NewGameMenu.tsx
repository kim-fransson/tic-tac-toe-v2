import { useState } from "react";
import Logo from "../assets/logo.svg?react";
import Switch from "./ui/Switch";
import Button from "./ui/Button";
import { useGameStore } from "../hooks";
import Slider from "./ui/Slider";
import { difficultyLevels } from "../utils";

export default function NewGameMenu() {
  const [oIsSelected, setOIsSelected] = useState(false);
  const setPlayer1Mark = useGameStore((state) => state.setPlayer1Mark);
  const setIsPlayer2CPU = useGameStore((state) => state.setIsPlayer2CPU);
  const isPlayer2CPU = useGameStore((state) => state.isPlayer2CPU);

  const difficulty = useGameStore((state) => state.difficulty);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  const difficultyIndex = difficultyLevels.findIndex(
    (d) => d.label === difficulty.label,
  );
  function handleNewGameAgainstPlayer() {
    setPlayer1Mark(oIsSelected ? "O" : "X");
  }

  function handleNewGameAgainstCPU() {
    setIsPlayer2CPU(true);
  }

  function handleStartGameAgainstCPU() {
    setPlayer1Mark(oIsSelected ? "O" : "X");
    setIsPlayer2CPU(true);
  }

  return (
    <div className="absolute top-1/2 w-full -translate-y-1/2 space-y-5">
      <h1 className="sr-only">New game</h1>
      <Logo className="mx-auto" />

      {isPlayer2CPU ? (
        <fieldset className="bg-dark-slate-400 inset-shadow-lg space-y-4 rounded-2xl p-5">
          <h2 className="text-center font-bold tracking-[1px]">
            PICK CPU DIFFICULTY LEVEL
          </h2>
          <Slider
            step={1}
            minValue={0}
            value={difficultyIndex}
            label={difficulty.label}
            onChange={(index) =>
              setDifficulty(difficultyLevels[index as number])
            }
            maxValue={difficultyLevels.length - 1}
            aria-label="select cpu difficulty"
            className="mx-auto"
          />
          <small className="block text-center text-sm leading-5 font-medium tracking-[0.875px] uppercase">
            {difficulty.description}
          </small>
        </fieldset>
      ) : (
        <fieldset className="bg-dark-slate-400 inset-shadow-lg space-y-4 rounded-2xl p-5">
          <h2 className="text-center font-bold tracking-[1px]">
            PICK PLAYER 1'S MARK
          </h2>
          <Switch
            isSelected={oIsSelected}
            onChange={setOIsSelected}
            aria-label="toggle between X or O"
          />
          <small className="block text-center text-sm leading-5 font-medium tracking-[0.875px]">
            REMEMBER: X GOES FIRST
          </small>
        </fieldset>
      )}

      {isPlayer2CPU ? (
        <Button onPress={handleStartGameAgainstCPU} className="w-full">
          START GAME
        </Button>
      ) : (
        <Button onPress={handleNewGameAgainstCPU} className="w-full">
          NEW GAME (VS CPU)
        </Button>
      )}
      {!isPlayer2CPU && (
        <Button
          onPress={handleNewGameAgainstPlayer}
          className="w-full"
          color="secondary"
        >
          NEW GAME (VS PLAYER)
        </Button>
      )}
    </div>
  );
}
