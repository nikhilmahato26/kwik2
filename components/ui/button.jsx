import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-off-white",
  {
    variants: {
      variant: {
        primary:
          "bg-maroon text-white hover:bg-maroon-deep shadow-[0_4px_14px_rgba(74,18,27,0.25)]",
        gold: "bg-gold text-maroon-deep hover:bg-gold-light",
        outline:
          "border-2 border-gold text-maroon bg-transparent hover:bg-gold/10",
        outlineLight:
          "border-2 border-white/70 text-white bg-transparent hover:bg-white/10",
        ghost: "text-maroon hover:bg-maroon/5",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, as: Comp = "button", ...props }) {
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
