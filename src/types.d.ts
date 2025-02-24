type Player = "X" | "O";

type Squares = (Player | null)[];

type BooleanStateUpdater = boolean | ((prev: boolean) => boolean);
type HistoryStateUpdater = Squares[] | ((prev: Squares[]) => Squares[]);
type NumberStateUpdater = number | ((prev: number) => number);
type PlayerStateUpdater = Player | ((prev: Player) => Player);
type StatusStateUpdater = Status | ((prev: Status) => Status);

type Status = {
  isDraw: boolean;
  winner: Player | null;
  loser: Player | null;
};

type GameSettings = {
  player1Mark: Player;
};
