import { useState } from "react";
import Logo from "./assets/logo.svg?react";
import Switch from "./components/ui/Switch";
import Button from "./components/ui/Button";
import { useGameStore } from "./hooks";

export default function NewGameMenu() {
  const [oIsSelected, setOIsSelected] = useState(false);
  const setPlayer1Mark = useGameStore((state) => state.setPlayer1Mark);
  const setIsPlayer2CPU = useGameStore((state) => state.setIsPlayer2CPU);

  function handleNewGameAgainstPlayer() {
    setPlayer1Mark(oIsSelected ? "O" : "X");
  }

  function handleNewGameAgainstCPU() {
    setPlayer1Mark(oIsSelected ? "O" : "X");
    setIsPlayer2CPU(true);
  }

  return (
    <div className="absolute top-1/2 -translate-y-1/2 space-y-5">
      <h1 className="sr-only">New game</h1>
      <Logo className="mx-auto" />
      <fieldset className="bg-dark-slate-400 inset-shadow-lg w-full space-y-4 rounded-2xl p-5">
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
      <Button onPress={handleNewGameAgainstCPU} className="w-full">
        NEW GAME (VS CPU)
      </Button>
      <Button
        onPress={handleNewGameAgainstPlayer}
        className="w-full"
        color="secondary"
      >
        NEW GAME (VS PLAYER)
      </Button>
    </div>
  );
}
