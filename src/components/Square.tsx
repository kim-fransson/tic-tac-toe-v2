import { AnimatePresence, motion } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";

import Button from "./ui/Button";

import XIcon from "../assets/icon-x.svg?react";
import OIcon from "../assets/icon-o.svg?react";
import XOutlineIcon from "../assets/icon-x-outline.svg?react";
import OOutlineIcon from "../assets/icon-o-outline.svg?react";

import { tv } from "tailwind-variants";
import { useState } from "react";
import { getNumpadKey } from "../utils";

interface SquareProps {
  onClick: () => void;
  value: Player | null;
  player: Player;
  index: number;
  isDisabled?: boolean;
}

const styles = tv({
  base: "size-10 md:size-16",
  variants: {
    symbol: {
      X: "text-turquoise-500",
      O: "text-orange-500",
    },
  },
});

const iconMap = {
  X: XIcon,
  O: OIcon,
  XOutline: XOutlineIcon,
  OOutline: OOutlineIcon,
};

const motionVariants = {
  valueIcon: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: [1.2, 0.9, 1],
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },
  hoverIcon: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

export default function Square({
  onClick,
  value,
  player,
  index,
  isDisabled,
}: SquareProps) {
  const [isHovered, setIsHovered] = useState(false);

  useHotkeys<HTMLButtonElement>(getNumpadKey(index) as string, () => onClick());

  const ValueIcon = value ? iconMap[value] : null;
  const HoverIcon = !value && isHovered ? iconMap[`${player}Outline`] : null;

  return (
    <Button
      onPress={onClick}
      color="dark-slate"
      size="square"
      onHoverChange={setIsHovered}
      isDisabled={value !== null || isDisabled}
    >
      <AnimatePresence>
        {ValueIcon && (
          <motion.div {...motionVariants.valueIcon}>
            <ValueIcon className={styles({ symbol: value as "X" | "O" })} />
          </motion.div>
        )}
        {!ValueIcon && HoverIcon && (
          <motion.div {...motionVariants.hoverIcon}>
            <HoverIcon className={styles({ symbol: player })} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
