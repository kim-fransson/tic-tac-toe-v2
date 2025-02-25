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

function getAvailableMoves(board: Squares): number[] {
  return board
    .map((square, index) => (square === null ? index : null))
    .filter((index) => index !== null) as number[];
}

function score(player: Player, depth: number, winner: Player | null): number {
  const opponent = player === "X" ? "O" : "X";
  if (winner === player) {
    return 10 - depth;
  } else if (winner === opponent) {
    return depth - 10;
  } else {
    return 0;
  }
}

function minimax(
  board: Squares,
  player: Player,
  depth: number,
): { move: number | null; score: number } {
  const winner = calculateWinner(board);
  const turns = calculateTurns(board);

  if (winner !== null || turns === 0) {
    return { move: null, score: score(player, depth, winner) };
  }

  let bestMove: number | null = null;
  let bestScore = player === "X" ? -Infinity : Infinity;
  const opponent = player === "X" ? "O" : "X";

  getAvailableMoves(board).forEach((move) => {
    const newBoard = [...board];
    newBoard[move] = player;
    const { score: moveScore } = minimax(newBoard, opponent, depth + 1);

    if (
      (player === "X" && moveScore > bestScore) ||
      (player === "O" && moveScore < bestScore)
    ) {
      bestScore = moveScore;
      bestMove = move;
    }
  });

  return { move: bestMove, score: bestScore };
}

export function makeDecision(board: Squares, cpu: Player): number {
  return minimax(board, cpu, 0).move!;
}
