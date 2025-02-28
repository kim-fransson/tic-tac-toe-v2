/* eslint-disable react-hooks/exhaustive-deps */
import Board from "../components/Board";
import { useGameStore } from "../hooks";

import Logo from "../assets/logo.svg?react";
import ResetIcon from "../assets/icon-restart.svg?react";
import TurnBadge from "../components/TurnBadge";
import Button from "../components/ui/Button";
import PointBadge from "../components/PointBadge";
import { calculateTurns, calculateWinner, makeDecision } from "../utils";
import GameOverModal from "../components/GameOverModal";
import { useEffect, useState } from "react";
import RestartGameModal from "../components/RestartGameModal";

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
  const newGame = useGameStore((state) => state.newGame);
  const endGame = useGameStore((state) => state.endGame);
  const restartGame = useGameStore((state) => state.restartGame);
  const isPlayer2CPU = useGameStore((state) => state.isPlayer2CPU);
  const difficulty = useGameStore((state) => state.difficulty);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const setGameOver = useGameStore((state) => state.setGameOver);

  const [showRestartGameModal, setShowRestartGameModal] = useState(false);

  const currentSquares = history[history.length - 1];
  const currentPlayer = xIsNext ? "X" : "O";
  const winner = calculateWinner(currentSquares);

  const [isCPUThinking, setIsCPUThinking] = useState(
    currentPlayer !== player1Mark && isPlayer2CPU,
  );

  function handlePlay(nextSquares: Squares) {
    const winner = calculateWinner(nextSquares);
    const turns = calculateTurns(nextSquares);
    const isGameOver = winner !== null || turns === 0;

    if (isGameOver) {
      updateScores(winner);
      setGameOver(true);
    }
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function updateScores(winner: Player | null) {
    if (winner === "X") {
      setXWins((prev) => prev + 1);
    } else if (winner === "O") {
      setOWins((prev) => prev + 1);
    } else {
      setTies((prev) => prev + 1);
    }
  }

  function handleNextGame() {
    setGameOver(false);
    newGame();
  }

  function handleEndGame() {
    setGameOver(false);
    endGame();
  }

  function handleCancel() {
    setShowRestartGameModal(false);
  }

  function handleRestartGame() {
    restartGame();
    setShowRestartGameModal(false);
  }

  function handleCPUPlay() {
    setIsCPUThinking(true);
    const decision = makeDecision(currentSquares, currentPlayer, difficulty);
    const nextSquares = currentSquares.slice();
    nextSquares[decision] = currentPlayer;
    handlePlay(nextSquares);
    setIsCPUThinking(false);
  }

  useEffect(() => {
    if (currentPlayer !== player1Mark && isPlayer2CPU && !isGameOver) {
      handleCPUPlay();
    }
  }, [currentPlayer, isGameOver]);

  return (
    <div className="absolute md:top-1/2 md:-translate-y-1/2">
      <GameOverModal
        isOpen={isGameOver}
        winner={winner}
        player1mark={player1Mark as Player}
        isPlayer2CPU={isPlayer2CPU}
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
        <TurnBadge player={currentPlayer} />
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
        player={currentPlayer}
        squares={currentSquares}
        onPlay={handlePlay}
        isDisabled={isGameOver || showRestartGameModal || isCPUThinking}
      />
      <div className="mt-5 grid grid-cols-3 gap-5">
        <PointBadge
          color="secondary"
          label={`X (${player1Mark === "X" ? "P1" : isPlayer2CPU ? "CPU" : "P2"})`}
          point={xWins}
        />
        <PointBadge color="neutral" label="Ties" point={ties} />
        <PointBadge
          color="primary"
          label={`O (${player1Mark === "O" ? "P1" : isPlayer2CPU ? "CPU" : "P2"})`}
          point={oWins}
        />
      </div>
    </div>
  );
}
