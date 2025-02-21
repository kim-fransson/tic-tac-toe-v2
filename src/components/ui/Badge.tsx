import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
/* Rectangle Copy */

const styles = tv({
  base: "flex items-center justify-center",
  variants: {
    noShadow: {
      true: "inset-shadow-none",
      false: "inset-shadow-md",
    },
    color: {
      primary: "bg-orange-500",
      secondary: "bg-turquoise-500",
      neutral: "bg-steel-500",
      "dark-slate": "bg-dark-slate-400",
    },

    size: {
      md: "h-10 pb-1",
      lg: "h-16 pb-1",
    },
    radius: {
      md: "rounded-md",
      xl: "rounded-xl",
    },
  },
  compoundVariants: [
    {
      color: ["primary", "secondary", "neutral"],
      class: "text-dark-slate-500",
    },
  ],
  defaultVariants: {
    noShadow: false,
    radius: "md",
    size: "md",
    color: "dark-slate",
  },
});

type BadgeVariants = VariantProps<typeof styles>;

interface BadgeProps extends BadgeVariants {
  className?: string;
  children?: ReactNode;
}

export default function Badge({ children, className, ...rest }: BadgeProps) {
  return <div className={styles({ className, ...rest })}>{children}</div>;
}
