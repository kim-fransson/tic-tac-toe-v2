import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";

import { tv, VariantProps } from "tailwind-variants";
import { focusRing } from "../utils";

const styles = tv({
  extend: focusRing,
  base: "text-dark-slate-500 transition-color-transform cursor-pointer font-bold tracking-widest ease-out",
  variants: {
    isHovered: {
      true: "transition-all duration-300", // don't want to apply transition on focus ring
    },
    color: {
      primary: "bg-orange-500 hover:bg-orange-400",
      secondary: "bg-turquoise-500 hover:bg-turquoise-400",
      neutral: "bg-steel-500 hover:bg-steel-400",
    },
    size: {
      icon: "inset-shadow-md flex size-[52px] items-center justify-center rounded-xl",
      sm: "inset-shadow-md h-[52px] rounded-xl pb-1 text-base leading-5",
      md: "inset-shadow-lg h-[67px] rounded-2xl pb-2 text-xl/6 leading-6",
    },
  },
  compoundVariants: [
    {
      isFocusVisible: false,
      isPressed: true,
      class: "scale-95",
    },
    {
      size: ["sm", "md"],
      class: "px-4",
    },
  ],
  defaultVariants: {
    size: "md",
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
