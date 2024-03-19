import React, { FC, ReactNode } from "react";

type DefaultButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({ fullWidth = false, children, className, variant = "primary", ...buttonProps }) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "bg-brand-200  hover:bg-brand-300 active:bg-brand-200 border-brand-200 hover:border-brand-300 active:border-brand-200 text-black";
      }
      case "secondary": {
        return " bg-transparent text-white";
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
      className={`font-spacemono font-bold py-2 md:py-3 px-6 select-none focus:outline-none text-sm ${fullWidthStyle} border rounded-sm ${getVariant()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
