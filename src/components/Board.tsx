import { tv } from "tailwind-variants";
import Square from "./Square";

const styles = tv({ base: "grid grid-cols-3 gap-5" });
interface BoardProps {
  player: Player;
  squares: Squares;
  onPlay: (nextSquares: Squares) => void;
  className?: string;
}

export default function Board({
  player,
  squares,
  onPlay,
  className,
}: BoardProps) {
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
      <div className={styles({ className })}>
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            index={squareIndex}
            value={square}
            player={player}
            onClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  );
}
