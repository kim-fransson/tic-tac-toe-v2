type Player = "X" | "O";

type Squares = (Player | null)[];

type BooleanStateUpdater = boolean | ((prev: boolean) => boolean);
type HistoryStateUpdater = Squares[] | ((prev: Squares[]) => Squares[]);
type NumberStateUpdater = number | ((prev: number) => number);
type PlayerStateUpdater = Player | ((prev: Player) => Player);

type GameSettings = {
  player1Mark: Player;
};

type Difficulty = {
  sloppiness: number;
  label: string;
  description: string;
  maxDepth: number;
};
