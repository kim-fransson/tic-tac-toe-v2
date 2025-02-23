import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)] as Squares[],
      currentMove: 0,
      xIsNext: true,
      player1Mark: "X" as Player,
    },
    (set) => {
      return {
        setHistory: (nextHistory: HistoryStateUpdater) => {
          set((state) => ({
            history:
              typeof nextHistory === "function"
                ? nextHistory(state.history)
                : nextHistory,
          }));
        },
        setCurrentMove: (nextCurrentMove: NumberStateUpdater) => {
          set((state) => ({
            currentMove:
              typeof nextCurrentMove === "function"
                ? nextCurrentMove(state.currentMove)
                : nextCurrentMove,
          }));
        },
        setPlayer1Mark: (nextPlayer1mark: PlayerStateUpdater) => {
          set((state) => ({
            player1Mark:
              typeof nextPlayer1mark === "function"
                ? nextPlayer1mark(state.player1Mark)
                : nextPlayer1mark,
          }));
        },
        setXIsNext: (nextXIsNext: BooleanStateUpdater) => {
          set((state) => ({
            xIsNext:
              typeof nextXIsNext === "function"
                ? nextXIsNext(state.xIsNext)
                : nextXIsNext,
          }));
        },
      };
    },
  ),
);
