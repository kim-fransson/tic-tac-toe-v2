import { useGameStore } from "./hooks";
import NewGameMenu from "./components/NewGameMenu";
import Game from "./components/Game";

function App() {
  const player1Mark = useGameStore((state) => state.player1Mark);
  return (
    <main className="relative mx-auto min-h-svh max-w-[328px] py-5 md:max-w-[460px]">
      {player1Mark ? <Game /> : <NewGameMenu />}
    </main>
  );
}

export default App;
