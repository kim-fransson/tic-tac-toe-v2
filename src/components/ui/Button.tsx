import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";

import { tv, VariantProps } from "tailwind-variants";
import { focusRing } from "../../utils";

const styles = tv({
  extend: focusRing,
  base: "text-dark-slate-500 cursor-pointer font-bold tracking-widest transition-(--color-transform-properties) ease-out",
  variants: {
    isPressed: {
      true: "scale-95",
    },
    isDisabled: {
      true: "cursor-not-allowed",
    },
    color: {
      primary: "bg-orange-500 hover:bg-orange-400",
      secondary: "bg-turquoise-500 hover:bg-turquoise-400",
      neutral: "bg-steel-500 hover:bg-steel-400",
      "dark-slate": "bg-dark-slate-400",
    },
    size: {
      square:
        "inset-shadow-lg size-24 rounded-xl pb-2 md:size-[140px] md:rounded-2xl",
      icon: "inset-shadow-md size-10 rounded-md md:size-[52px] md:rounded-xl",
      button: [
        "inset-shadow-md md:inset-shadow-lg h-[52px] rounded-xl px-4 pb-1 text-base/snug",
        "md:h-[67px] md:rounded-2xl md:pb-2 md:text-xl/normal",
      ],
    },
  },
  compoundVariants: [
    {
      size: ["square", "icon"],
      class: "flex items-center justify-center",
    },
    {
      isDisabled: true,
      isPressed: true,
      class: "scale-100",
    },
  ],
  defaultVariants: {
    size: "button",
    color: "primary",
  },
});

type ButtonVariants = VariantProps<typeof styles>;

interface ButtonProps extends AriaButtonProps, ButtonVariants {
  className?: string;
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <AriaButton
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className, ...rest }),
      )}
    >
      {children}
    </AriaButton>
  );
}
