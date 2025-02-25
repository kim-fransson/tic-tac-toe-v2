import Board from "./components/Board";
import { useGameStore } from "./hooks";

import Logo from "./assets/logo.svg?react";
import ResetIcon from "./assets/icon-restart.svg?react";
import TurnBadge from "./components/TurnBadge";
import Button from "./components/ui/Button";
import PointBadge from "./components/PointBadge";
import { calculateStatus, calculateTurns, calculateWinner } from "./utils";
import GameOverModal from "./components/GameOverModal";
import { useState } from "react";
import RestartGameModal from "./components/RestartGameModal";

export default function Game() {
  const history = useGameStore((state) => state.history);
  const setHistory = useGameStore((state) => state.setHistory);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const currentMove = useGameStore((state) => state.currentMove);
  const setCurrentMove = useGameStore((state) => state.setCurrentMove);
  const xWins = useGameStore((state) => state.xWins);
  const setXWins = useGameStore((state) => state.setXWins);
  const oWins = useGameStore((state) => state.oWins);
  const setOWins = useGameStore((state) => state.setOWins);
  const ties = useGameStore((state) => state.ties);
  const setTies = useGameStore((state) => state.setTies);
  const player1Mark = useGameStore((state) => state.player1Mark);
  const status = useGameStore((state) => state.status);
  const setStatus = useGameStore((state) => state.setStatus);
  const newGame = useGameStore((state) => state.newGame);
  const endGame = useGameStore((state) => state.endGame);
  const restartGame = useGameStore((state) => state.restartGame);

  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showRestartGameModal, setShowRestartGameModal] = useState(false);

  const currentSquares = history[history.length - 1];
  const player = xIsNext ? "X" : "O";

  function handlePlay(nextSquares: Squares) {
    const winner = calculateWinner(nextSquares);
    const turns = calculateTurns(nextSquares);
    const status = calculateStatus(winner, turns, player);
    const isGameOver = status.winner !== null || status.isDraw;
    setStatus(status);

    if (isGameOver) {
      updateScores(status);
      setShowGameOverModal(true);
    }

    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function updateScores(status: Status) {
    if (status.winner === "X") {
      setXWins((prev) => prev + 1);
    } else if (status.winner === "O") {
      setOWins((prev) => prev + 1);
    } else if (status.isDraw) {
      setTies((prev) => prev + 1);
    }
  }

  function handleNextGame() {
    setShowGameOverModal(false);
    newGame();
  }

  function handleEndGame() {
    setShowGameOverModal(false);
    endGame();
  }

  function handleCancel() {
    setShowRestartGameModal(false);
  }

  function handleRestartGame() {
    restartGame();
    setShowRestartGameModal(false);
  }

  return (
    <div className="absolute md:top-1/2 md:-translate-y-1/2">
      <GameOverModal
        isOpen={showGameOverModal}
        status={status}
        player1mark={player1Mark as Player}
        onNextRound={handleNextGame}
        onQuit={handleEndGame}
      />
      <RestartGameModal
        isOpen={showRestartGameModal}
        onCancel={handleCancel}
        onRestart={handleRestartGame}
      />
      <header className="grid grid-cols-3 items-center gap-5">
        <Logo />
        <TurnBadge player={player} />
        <Button
          onPress={() => setShowRestartGameModal(true)}
          size="icon"
          color="neutral"
          className="justify-self-end"
        >
          <ResetIcon />
        </Button>
      </header>
      <Board
        className="mt-16 md:mt-5"
        player={player}
        squares={currentSquares}
        onPlay={handlePlay}
        isDisabled={showGameOverModal || showRestartGameModal}
      />
      <div className="mt-5 grid grid-cols-3 gap-5">
        <PointBadge
          color="secondary"
          label={`X (${player1Mark === "X" ? "P1" : "P2"})`}
          point={xWins}
        />
        <PointBadge color="neutral" label="Ties" point={ties} />
        <PointBadge
          color="primary"
          label={`O (${player1Mark === "O" ? "P1" : "P2"})`}
          point={oWins}
        />
      </div>
    </div>
  );
}
