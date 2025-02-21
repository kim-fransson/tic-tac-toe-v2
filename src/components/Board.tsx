import { create } from "zustand";
import Square from "./Square";
import { combine } from "zustand/middleware";

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
    <div className="grid grid-cols-3 grid-rows-3 gap-5">
      {squares.map((square, squareIndex) => (
        <Square
          key={squareIndex}
          value={square}
          player={player}
          onClick={() => handleClick(squareIndex)}
        />
      ))}
    </div>
  );
}
