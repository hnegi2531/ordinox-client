import React, { ChangeEvent, useCallback, useState } from "react";
import Button from "./Button";

type SetPasswordProps = {
  password: string;
  setPassword: (value: string | ((prevVar: string) => string)) => void;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const SetPassword: React.FC<SetPasswordProps> = ({ password, setPassword, setScreenNumber }) => {

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  },[]);

  return (
    <div className="flex-grow flex flex-col items-start justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold uppercase">Secure your wallet</h1>
        <div>
          <label htmlFor="password" className="text-secondryText inline-block mb-2 text-sm font-medium">
            password
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={handlePasswordChange}
            className="bg-transparent border border-gray-300 text-sm rounded-lg focus:ring-brand-50 focus:border-brand-300 block w-full p-2.5"
            placeholder="enter password"
          />
        </div>
        <p className="text-xs text-textWarning">
          your password can’t be reset after sign up. forgetting your password can lead to loss of funds.{" "}
        </p>

        <p className="text-xs text-textWarning">set a strong, memorable password</p>
      </div>
      <div className="text-left">
        <Button
          variant="secondary"
          className="border-none uppercase py-0 md:py-0 px-0"
          onClick={() => setScreenNumber((prev) => prev + 1)}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SetPassword;
