import React from "react";
import { HiShieldCheck } from "react-icons/hi2";
const AccountSecured = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-between">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-md font-semibold uppercase text-verified text-2xl">Account Secured</h1>
        <span>
          <HiShieldCheck className="text-verified text-9xl" />
        </span>
        <p className="text-sm text-center">
          you have complete custody over your funds. Ordinox neither saves your password nor can access your private
          key.
        </p>
        <p className="text-sm text-center">never share these with anyone, they control your account</p>
      </div>
    </div>
  );
};

export default AccountSecured;
