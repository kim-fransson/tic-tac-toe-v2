import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { difficultyLevels } from "../utils";

const defaultState = {
  history: [Array(9).fill(null)],
  currentMove: 0,
  xIsNext: true,
  player1Mark: null as Player | null,
  isPlayer2CPU: false,
  xWins: 0,
  oWins: 0,
  ties: 0,
  difficulty: difficultyLevels[2],
  isGameOver: false,
};

interface GameState {
  history: Squares[];
  currentMove: number;
  xIsNext: boolean;
  player1Mark: Player | null;
  isPlayer2CPU: boolean;
  xWins: number;
  oWins: number;
  ties: number;
  difficulty: Difficulty;
  isGameOver: boolean;

  setHistory: (history: Squares[] | ((prev: Squares[]) => Squares[])) => void;
  setCurrentMove: (currentMove: number | ((prev: number) => number)) => void;
  setXIsNext: (xIsNext: boolean | ((prev: boolean) => boolean)) => void;
  setPlayer1Mark: (
    player1Mark: Player | null | ((prev: Player | null) => Player | null),
  ) => void;
  setIsPlayer2CPU: (
    isPlayer2CPU: boolean | ((prev: boolean) => boolean),
  ) => void;
  setXWins: (xWins: number | ((prev: number) => number)) => void;
  setOWins: (oWins: number | ((prev: number) => number)) => void;
  setTies: (ties: number | ((prev: number) => number)) => void;
  setGameOver: (gameOver: boolean | ((prev: boolean) => boolean)) => void;
  setDifficulty: (
    difficulty: Difficulty | ((prev: Difficulty) => Difficulty),
  ) => void;

  newGame: () => void;
  endGame: () => void;
  restartGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    combine(defaultState, (set) => ({
      setHistory: (history) =>
        set((state) => ({
          history:
            typeof history === "function" ? history(state.history) : history,
        })),
      setCurrentMove: (currentMove) =>
        set((state) => ({
          currentMove:
            typeof currentMove === "function"
              ? currentMove(state.currentMove)
              : currentMove,
        })),
      setXIsNext: (xIsNext) =>
        set((state) => ({
          xIsNext:
            typeof xIsNext === "function" ? xIsNext(state.xIsNext) : xIsNext,
        })),
      setPlayer1Mark: (player1Mark) =>
        set((state) => ({
          player1Mark:
            typeof player1Mark === "function"
              ? player1Mark(state.player1Mark)
              : player1Mark,
        })),
      setIsPlayer2CPU: (isPlayer2CPU) =>
        set((state) => ({
          isPlayer2CPU:
            typeof isPlayer2CPU === "function"
              ? isPlayer2CPU(state.isPlayer2CPU)
              : isPlayer2CPU,
        })),
      setXWins: (xWins) =>
        set((state) => ({
          xWins: typeof xWins === "function" ? xWins(state.xWins) : xWins,
        })),
      setOWins: (oWins) =>
        set((state) => ({
          oWins: typeof oWins === "function" ? oWins(state.oWins) : oWins,
        })),
      setTies: (ties) =>
        set((state) => ({
          ties: typeof ties === "function" ? ties(state.ties) : ties,
        })),
      setGameOver: (gameOver) =>
        set((state) => ({
          isGameOver:
            typeof gameOver === "function"
              ? gameOver(state.isGameOver)
              : gameOver,
        })),
      setDifficulty: (difficulty) =>
        set((state) => ({
          difficulty:
            typeof difficulty === "function"
              ? difficulty(state.difficulty)
              : difficulty,
        })),
      newGame: () =>
        set((state) => ({
          ...defaultState,
          difficulty: state.difficulty,
          isPlayer2CPU: state.isPlayer2CPU,
          xWins: state.xWins,
          oWins: state.oWins,
          ties: state.ties,
          player1Mark: state.player1Mark,
          xIsNext: (state.oWins + state.xWins + state.ties) % 2 === 0,
        })),
      endGame: () => set(() => defaultState),
      restartGame: () =>
        set((state) => ({
          ...defaultState,
          difficulty: state.difficulty,
          isPlayer2CPU: state.isPlayer2CPU,
          xWins: state.xWins,
          oWins: state.oWins,
          ties: state.ties,
          player1Mark: state.player1Mark,
          xIsNext: (state.oWins + state.xWins + state.ties) % 2 === 0,
        })),
    })),
    {
      name: "tic-tac-toe-game-state",
    },
  ),
);
