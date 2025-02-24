import Game from "./Game";
import { useGameStore } from "./hooks";
import NewGameMenu from "./NewGameMenu";

function App() {
  const player1Mark = useGameStore((state) => state.player1Mark);
  return (
    <main className="mx-auto min-h-svh max-w-[328px] py-5">
      {player1Mark ? <Game /> : <NewGameMenu />}
    </main>
  );
}

export default App;
