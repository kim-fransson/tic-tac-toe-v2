import { create } from "zustand";
import { combine } from "zustand/middleware";

import Logo from "../assets/logo.svg?react";
import ResetIcon from "../assets/icon-restart.svg?react";
import OIcon from "../assets/icon-o.svg?react";
import XIcon from "../assets/icon-x.svg?react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

import Square from "./Square";
import PointBadge from "./PointBadge";

// interface BoardProps {}

type Squares = ("X" | "O" | null)[];
type XIsNextUpdater = boolean | ((prev: boolean) => boolean);
type SquaresUpdater = Squares | ((prev: Squares) => Squares);

const useGameStore = create(
  combine({ squares: Array(9).fill(null) as Squares, xIsNext: true }, (set) => {
    return {
      setSquares: (nextSquares: SquaresUpdater) => {
        set((state) => ({
          squares:
            typeof nextSquares === "function"
              ? nextSquares(state.squares)
              : nextSquares,
        }));
      },
      setXIsNext: (nextXIsNext: XIsNextUpdater) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === "function"
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }));
      },
    };
  }),
);

export default function Board() {
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);
  const player = xIsNext ? "X" : "O";

  function handleClick(i: number) {
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <header className="grid grid-cols-3 items-center gap-5">
        <Logo />
        <Badge className="mt-1 flex items-center">
          {player === "X" ? (
            <XIcon className="size-4" />
          ) : (
            <OIcon className="size-4" />
          )}
          <strong className="text-center text-sm leading-5 font-bold tracking-[0.875px]">
            TURN
          </strong>
        </Badge>
        <Button size="icon" color="neutral" className="justify-self-end">
          <ResetIcon />
        </Button>
      </header>
      <div className="mt-16 grid grid-cols-3 gap-5">
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            player={player}
            onClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-5">
        <PointBadge color="secondary" label="TBD" point="TBD" />
        <PointBadge color="neutral" label="TBD" point="TBD" />
        <PointBadge color="primary" label="TBD" point="TBD" />
      </div>
    </>
  );
}
