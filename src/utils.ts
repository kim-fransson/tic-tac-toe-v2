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

function calculateScore(
  player: Player,
  opponent: Player,
  winner: Player | null,
  depth: number,
) {
  if (winner === player) {
    return 10 - depth;
  }
  if (winner === opponent) {
    return depth - 10;
  }

  return 0;
}

function minimax(
  board: Squares,
  currentPlayer: Player,
  player: Player,
  opponent: Player,
  depth = 0,
) {
  const turns = calculateTurns(board);
  const winner = calculateWinner(board);
  const isGameOver = winner || turns === 0;
  if (isGameOver) {
    return { score: calculateScore(player, opponent, winner, depth), move: -1 };
  }

  let bestMove = -1;
  let bestScore = currentPlayer === player ? -Infinity : Infinity;

  getAvailableMoves(board).forEach((move) => {
    const newBoard = [...board];
    newBoard[move] = currentPlayer;

    const res = minimax(
      newBoard,
      currentPlayer === "X" ? "O" : "X",
      player,
      opponent,
      depth + 1,
    );

    if (currentPlayer === player) {
      // Maximizing player
      if (res.score > bestScore) {
        bestScore = res.score;
        bestMove = move;
      }
    } else {
      // Minimizing opponent
      if (res.score < bestScore) {
        bestScore = res.score;
        bestMove = move;
      }
    }
  });

  return { score: bestScore, move: bestMove };
}

export function makeDecision(board: Squares, player: Player): number {
  return minimax(board, player, player, player === "X" ? "O" : "X").move;
}
