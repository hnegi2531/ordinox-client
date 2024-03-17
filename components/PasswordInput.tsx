import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

type DefaultInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type PasswordInputProps = {
  value: string;
  onChangeHandler: (e:ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & DefaultInputProps;

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChangeHandler, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(value.length, value.length);
      if (inputRef.current?.scrollLeft !== undefined) {
        inputRef.current.scrollLeft = inputRef.current?.scrollWidth;
      }
    }
  }, [showPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChangeHandler}
        className={` bg-transparent pl-2 pr-10 py-2  shadow appearance-none border border-brand-300 text-sm rounded-lg block w-full leading-tight focus:outline-none focus:ring-brand-50 focus:border-brand-300 focus:shadow-outline ${className}`}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 text-brand-300"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
    </div>
  );
};

export default React.memo(PasswordInput);
