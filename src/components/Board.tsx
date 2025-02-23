import Square from "./Square";

interface BoardProps {
  player: Player;
  squares: Squares;
  onPlay: (nextSquares: Squares) => void;
}

export default function Board({ player, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }

  return (
    <>
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
    </>
  );
}
