import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zion-gold focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider",
                    {
                        "bg-transparent border border-zion-gold text-zion-gold hover:bg-zion-gold hover:text-black hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]":
                            variant === "outline",
                        "bg-zion-gold text-black hover:bg-yellow-400 hover:shadow-lg":
                            variant === "primary",
                        "hover:bg-white/10 text-zion-text": variant === "ghost",
                        "h-10 px-4 text-sm": size === "sm",
                        "h-12 px-8 text-base": size === "md",
                        "h-14 px-10 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
