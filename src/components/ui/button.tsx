import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 font-body",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-glow hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        romantic: "bg-gradient-to-r from-primary via-rose to-accent text-primary-foreground shadow-glow hover:shadow-float hover:scale-105 border-2 border-primary-foreground/20",
        playful: "bg-lavender text-foreground hover:bg-lavender-light shadow-soft hover:scale-110 hover:-rotate-2 transition-all duration-300",
        glow: "bg-primary/20 backdrop-blur-sm text-primary border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-glow hover:scale-105",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6 text-sm",
        lg: "h-14 px-10 py-4 text-lg",
        xl: "h-16 px-12 py-5 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
