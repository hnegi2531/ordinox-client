import Button from "@/components/Button";
import OTPInput from "@/components/OTPInput";
import React, { useState } from "react";

const Discord = () => {
  const [otp, setOtp] = useState("");

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      discord
    </div>
  );
};

export default Discord;
