import { cn } from "@/utils/twMerge.helper";
import React, { FC, ReactNode } from "react";

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
      {loading ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
        : children}
    </button>
  );
};

export default Button;
