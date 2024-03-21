import React, { useState, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCopy } from "react-icons/ai";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

type DefaultInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type PreviewInputProps = {
  value: string;
  className?: string;
} & DefaultInputProps;

const PreviewInput: React.FC<PreviewInputProps> = ({ value, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative flex items-center text-secondryText">
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 left-0 flex items-center px-3 text-secondryText"
      >
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </button>
      <input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        value={value}
        readOnly
        className={`bg-transparent pl-10 pr-10 py-2 shadow appearance-none border border-brand-300 text-sm text-secondryText rounded-lg block w-full leading-tight focus:outline-none focus:ring-brand-50 focus:border-brand-300 focus:shadow-outline ${className}`}
      />
      <button
        type="button"
        onClick={copyToClipboard}
        className={`absolute right-0 inset-y-0 flex items-center px-3 ${copied ? "text-verified" : "text-secondryText"} `}
      >
        {copied ? <FaClipboardCheck /> : <FaClipboard />}
      </button>
    </div>
  );
};

export default PreviewInput;
