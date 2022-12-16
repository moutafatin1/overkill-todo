import type { ButtonHTMLAttributes } from "react";
import React from "react";
import { fn } from "../../../utils/fn";
import { Spinner } from "./Spinner";

const variants = {
  primary: "bg-violet-500 text-white",
  danger: "bg-red-400 text-white",
  info: "bg-blue-400 text-white",
  outline: "bg-transparent border text-violet-500 border-violet-500",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  modifier?: "plain" | "outline";
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

const Button = ({
  children,
  className,
  isLoading,
  startIcon,
  endIcon,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={fn(
        "flex items-center justify-center rounded-md  font-medium transition-all hover:opacity-80 active:scale-90",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading && (
        <Spinner show={isLoading} className="animate-spin text-3xl" />
      )}
      {!isLoading && startIcon && <span className="text-3xl">{startIcon}</span>}
      <span className="mx-2">{children}</span>
      {!isLoading && endIcon && <span className="text-3xl">{endIcon}</span>}
    </button>
  );
};

export default Button;
