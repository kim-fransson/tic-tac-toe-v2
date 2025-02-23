import { AnimatePresence, motion } from "framer-motion";
import Button from "./ui/Button";

import XIcon from "../assets/icon-x.svg?react";
import OIcon from "../assets/icon-o.svg?react";
import XOutlineIcon from "../assets/icon-x-outline.svg?react";
import OOutlineIcon from "../assets/icon-o-outline.svg?react";

import { tv } from "tailwind-variants";
import { useState } from "react";

interface SquareProps {
  onClick: () => void;
  value: Player | null;
  player: Player;
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

export default function Square({ onClick, value, player }: SquareProps) {
  const [isHovered, setIsHovered] = useState(false);

  const ValueIcon = value ? iconMap[value] : null;
  const HoverIcon = !value && isHovered ? iconMap[`${player}Outline`] : null;

  return (
    <Button
      onPress={onClick}
      color="dark-slate"
      size="square"
      onHoverChange={setIsHovered}
      isDisabled={value !== null}
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
