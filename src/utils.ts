import { tv } from "tailwind-variants";

export const focusRing = tv({
  base: "outline outline-offset-2 outline-blue-500",
  variants: {
    isFocusVisible: {
      false: "outline-0",
      true: "outline-2",
    },
  },
});

export function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTurns(squares: Squares) {
  return squares.filter((square) => !square).length;
}

export function calculateStatus(
  winner: Player | null,
  turns: number,
  player: Player,
): Status {
  if (!winner && !turns) return { isDraw: true, winner: null, loser: null };
  if (winner) return { isDraw: false, winner, loser: player };
  return { isDraw: false, winner: null, loser: null };
}

export function getNumpadKey(index: number): string | null {
  const numpadMap = [
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad1",
    "Numpad2",
    "Numpad3",
  ];

  return numpadMap[index] ?? null;
}
