type Player = "X" | "O";

type Squares = (Player | null)[];

type BooleanStateUpdater = boolean | ((prev: boolean) => boolean);
type HistoryStateUpdater = Squares[] | ((prev: Squares[]) => Squares[]);
type NumberStateUpdater = number | ((prev: number) => number);
type PlayerStateUpdater = Player | ((prev: Player) => Player);

type Status = {
  isDraw: boolean;
  winner: Player | null;
  loser: Player | null;
};
