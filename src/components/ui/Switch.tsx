import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
  composeRenderProps,
} from "react-aria-components";

import IconX from "../assets/icon-x.svg?react";
import IconO from "../assets/icon-o.svg?react";

import { motion } from "motion/react";
import { tv } from "tailwind-variants";
import { focusRing } from "../../utils";

const base = tv({
  extend: focusRing,
  base: "bg-dark-slate-500 relative flex h-[72px] cursor-pointer rounded-xl p-2 outline-orange-500",
});

const handle = tv({
  base: "bg-steel-500 absolute h-[54px] w-[calc(50%-8px)] rounded-xl",
  variants: {
    isSelected: {
      true: "right-2",
    },
  },
});

const wrapper = tv({
  base: "z-10 flex flex-1 items-center justify-center rounded-xl transition-colors duration-200",
  variants: {
    isSelected: {
      true: "",
    },
    position: {
      left: "",
      right: "",
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      position: ["left"],
      class: "text-dark-slate-500",
    },
    {
      isSelected: true,
      position: ["right"],
      class: "text-dark-slate-500",
    },
  ],
});

const icon = tv({
  base: "scale-50",
});

interface SwitchProps extends AriaSwitchProps {
  className?: string;
}

export default function Switch({ className, ...rest }: SwitchProps) {
  return (
    <AriaSwitch
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        base({ ...renderProps, className, ...rest }),
      )}
    >
      {({ isSelected }) => (
        <>
          <motion.div
            layout
            className={handle({ isSelected })}
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.3,
            }}
          />
          <div className={wrapper({ isSelected, position: "left" })}>
            <IconX className={icon()} />
          </div>
          <div className={wrapper({ isSelected, position: "right" })}>
            <IconO className={icon()} />
          </div>
        </>
      )}
    </AriaSwitch>
  );
}
