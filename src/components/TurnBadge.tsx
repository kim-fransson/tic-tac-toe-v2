import Badge from "./ui/Badge";

import OIcon from "../assets/icon-o.svg?react";
import XIcon from "../assets/icon-x.svg?react";

interface TurnBadgeProps {
  player: Player;
}

export default function TurnBadge({ player }: TurnBadgeProps) {
  return (
    <Badge className="mt-1 flex items-center gap-2">
      {player === "X" ? (
        <XIcon className="size-4" />
      ) : (
        <OIcon className="size-4" />
      )}
      <strong className="text-center text-sm leading-5 font-bold tracking-[0.875px]">
        TURN
      </strong>
    </Badge>
  );
}
