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
      <div className="max-w-lg flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-brand-300 text-center">enter invite code</h1>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-center">
              in order to deposit funds into your ordinox trading wallet and start earning points enter your invite code{" "}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <OTPInput
              inputStyle="bg-transparent text-center border w-8 rounded-md px-2 py-2"
              numInputs={5}
              onChange={handleOTPChange}
              // renderSeparator={<span>{separator}</span>}
              value={otp}
              inputType={"text"}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              skipDefaultStyles
            />
          </div>

         
        </div>

        <div className="w-full flex items-center justify-center text-center px-10">
            <Button variant="primary" className="uppercase w-full">redeem invite code</Button>
          </div>
      </div>
    </div>
  );
};

export default Discord;
