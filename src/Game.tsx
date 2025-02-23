import Board from "./components/Board";
import { useGameStore } from "./hooks";

import Logo from "./assets/logo.svg?react";
import ResetIcon from "./assets/icon-restart.svg?react";
import TurnBadge from "./components/TurnBadge";
import Button from "./components/ui/Button";
import PointBadge from "./components/PointBadge";
import { calculateStatus, calculateTurns, calculateWinner } from "./utils";
import GameOverModal from "./components/GameOverModal";

export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const player1Mark = useGameStore((state) => state.player1Mark);

  const currentSquares = history[history.length - 1];
  const player = xIsNext ? "X" : "O";

  const winner = calculateWinner(currentSquares);
  const turns = calculateTurns(currentSquares);
  const status = calculateStatus(winner, turns, player);

  const isGameOver = status.winner !== null || status.isDraw;

  function handlePlay(nextSquares: Squares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  // function jumpTo(nextMove: number) {
  //   setCurrentMove(nextMove);
  //   setXIsNext(currentMove % 2 === 0);
  // }

  return (
    <>
      <GameOverModal
        isOpen={isGameOver}
        status={status}
        player1mark={player1Mark}
      />
      <header className="grid grid-cols-3 items-center gap-5">
        <Logo />
        <TurnBadge player={player} />
        <Button size="icon" color="neutral" className="justify-self-end">
          <ResetIcon />
        </Button>
      </header>
      <Board player={player} squares={currentSquares} onPlay={handlePlay} />
      <div className="mt-5 grid grid-cols-3 gap-5">
        <PointBadge color="secondary" label="TBD" point="TBD" />
        <PointBadge color="neutral" label="TBD" point="TBD" />
        <PointBadge color="primary" label="TBD" point="TBD" />
      </div>
    </>
  );
}
