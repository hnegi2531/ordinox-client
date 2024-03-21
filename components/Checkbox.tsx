import { cn } from "@/utils/twMerge.helper";
import React from "react";
import { FaCheck } from "react-icons/fa6";

type DefaultInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CheckboxProps = {
  value: boolean;
  onChange: () => void;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, className }) => {
  return (
    <div className="flex items-center relative cursor-pointer" onClick={onChange}>
      <input
        id="confirm-checkbox"
        type="checkbox"
        className={cn("appearance-none h-5 w-5 border-2 rounded-sm border-brand-300 checked:bg-brand-500", className)}
        checked={value}
        // onChange={onChange}
      />
      <FaCheck className="text-sm text-black absolute left-0.5 top-0.5 text-opacity-0 check-1 transition" />
    </div>
  );
};

export default Checkbox;
