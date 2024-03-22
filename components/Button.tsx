import { cn } from "@/utils/twMerge.helper";
import React, { FC, ReactNode } from "react";
import Loader from "./Loader";

type DefaultButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  loading?: boolean;
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({ fullWidth = false, loading = false, children, className, variant = "primary", ...buttonProps }) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "bg-brand-200  hover:bg-brand-300 active:bg-brand-200 border-brand-200 hover:border-brand-300 active:border-brand-200 text-black disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed";
      }
      case "secondary": {
        return " bg-transparent text-white disabled:text-gray-600 disabled:cursor-not-allowed";
      }
      case "tertiary": {
        return "text-black bg-grey-300 hover:bg-grey-400 active:bg-grey-500";
      }
      default: {
        return " bg-brand-600 hover:bg-brand-500 active:bg-brand-600 ";
      }
    }
  };

  return (
    <button
      {...buttonProps}
      className={cn(
        `font-spacemonofont-bold py-2 md:py-3 px-12 select-none focus:outline-none text-sm  border rounded-sm`,
        fullWidthStyle,
        getVariant(),
        className
      )}
    >
      {loading ? <Loader />
        : children}
    </button>
  );
};

export default Button;
