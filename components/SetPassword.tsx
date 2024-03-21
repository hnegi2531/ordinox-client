import React, { ChangeEvent, useCallback, useState } from "react";
import Button from "./Button";
import PasswordInput from "./PasswordInput";

type SetPasswordProps = {
  password: string;
  setPassword: (value: string | ((prevVar: string) => string)) => void;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const SetPassword: React.FC<SetPasswordProps> = ({ password, setPassword, setScreenNumber }) => {
  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const proceedHandler = () => {
    if (!password) return;
    setScreenNumber((prev) => prev + 1);
  };

  return (
    <div className="flex-grow flex flex-col items-stretch justify-between gap-28">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold uppercase">Secure your wallet</h1>
        <div>
          <label htmlFor="password" className="text-secondryText inline-block mb-2 text-sm font-medium">
            password
          </label>
          <PasswordInput
            id="password"
            placeholder="enter password"
            value={password}
            onChangeHandler={handlePasswordChange}
          />
        </div>
        <p className="text-xs text-textWarning">
          your password can’t be reset after sign up. forgetting your password can lead to loss of funds.{" "}
        </p>

        <p className="text-xs text-textWarning">set a strong, memorable password</p>
      </div>
      <div className="text-right flex-grow">
        <Button
          variant="secondary"
          className="border-none uppercase py-0 md:py-0 px-0 text-secondryText hover:text-white disabled:text-gray-500"
          onClick={proceedHandler}
          disabled={password ? false : true}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default SetPassword;
