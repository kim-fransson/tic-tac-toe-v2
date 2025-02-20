import {
  Switch as AriaSwitch,
  SwitchProps as AriaSwitchProps,
  composeRenderProps,
} from "react-aria-components";

import IconX from "../assets/icon-x.svg?react";
import IconO from "../assets/icon-o.svg?react";

import { motion } from "motion/react";
import { tv, VariantProps } from "tailwind-variants";
import { focusRing } from "../utils";

const styles = tv({
  extend: focusRing,
  slots: {
    base: "bg-dark-slate-500 relative flex h-[72px] cursor-pointer rounded-xl p-2 outline-orange-500",
    handle: "bg-steel-500 absolute h-[54px] w-[calc(50%-8px)] rounded-xl",
    wrapper:
      "z-10 flex flex-1 items-center justify-center rounded-xl transition-colors duration-200",
    icon: "scale-50",
  },
  compoundVariants: [
    {
      isSelected: true,
      class: {
        handle: "right-2",
      },
    },
    {
      isSelected: false,
      position: ["left"],
      class: {
        wrapper: "text-dark-slate-500 hover:bg-none",
      },
    },
    {
      isSelected: false,
      position: ["right"],
      class: {
        wrapper: "hover:bg-slate-600",
      },
    },
    {
      isSelected: true,
      position: ["left"],
      class: {
        wrapper: "hover:bg-slate-600",
      },
    },
    {
      isSelected: true,
      position: ["right"],
      class: {
        wrapper: "text-dark-slate-500 hover:bg-none",
      },
    },
  ],
});

const { base, wrapper, icon, handle } = styles();

type SwitchVariants = VariantProps<typeof styles>;

interface SwitchProps extends AriaSwitchProps, SwitchVariants {
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
              bounce: 0.2,
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
