import { ModalOverlayProps } from "react-aria-components";
import Modal from "./ui/Modal";

import XIcon from "../assets/icon-x.svg?react";
import OIcon from "../assets/icon-o.svg?react";
import { tv } from "tailwind-variants";
import Button from "./ui/Button";

interface GameOverModalProps extends ModalOverlayProps {
  status: Status;
  player1mark: Player;
}

const roundResultTextStyles = tv({
  base: "text-steel-500 mt-4 flex items-center gap-2 text-center text-2xl leading-8 font-bold tracking-[1.5px]",
  variants: {
    winner: {
      O: "text-orange-500",
      X: "text-turquoise-500",
    },
  },
});

export default function GameOverModal({
  status,
  player1mark,
  ...rest
}: GameOverModalProps) {
  const { winner } = status;

  let winnerText;
  let roundResultText: React.ReactNode;
  if (winner) {
    winnerText = winner === player1mark ? "PLAYER 1 WINS!" : "PLAYER 2 WINS";
    roundResultText = (
      <h2 className={roundResultTextStyles({ winner })}>
        {winner === "X" ? (
          <XIcon className="size-8" />
        ) : (
          <OIcon className="size-8" />
        )}{" "}
        TAKES THE ROUND
      </h2>
    );
  } else {
    winnerText = "NO WINNERS, NO LOSERS!";
    roundResultText = <h2 className={roundResultTextStyles()}>ROUND TIED</h2>;
  }
  return (
    <Modal {...rest}>
      <p className="text-center text-sm leading-5 font-bold tracking-[0.875px]">
        {winnerText}
      </p>
      {roundResultText}
      <div className="mt-7 space-x-4">
        <Button color="neutral">QUIT</Button>
        <Button color="primary">NEXT ROUND</Button>
      </div>
    </Modal>
  );
}
