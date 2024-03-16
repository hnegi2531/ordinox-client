import React, { ChangeEvent, useCallback, useState } from "react";
import Button from "./Button";

type SetPasswordProps = {
  password: string;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const ConfirmPassword: React.FC<SetPasswordProps> = ({ password, setScreenNumber }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMismatched, setIsMismatched] = useState(false);

  const confirmPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if(e.target.value === ""){
      setIsMismatched(false)
    }
  }, []);

  const handleSetPassword = useCallback(() => {
    if(password===confirmPassword) return setScreenNumber((prev) => prev + 1)
    setIsMismatched(true);
  },[password, confirmPassword])

  return (
    <React.Fragment>
      <div className="flex-grow flex flex-col items-stretch justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold uppercase">Secure your wallet</h1>
          <div>
            <label htmlFor="confirm-password" className="text-secondryText inline-block mb-2 text-sm font-medium">
              confirm password
            </label>
            <input
              id="confirm-password"
              type="text"
              value={confirmPassword}
              onChange={confirmPasswordChange}
              className="bg-transparent border border-gray-300 text-sm rounded-lg focus:ring-brand-50 focus:border-brand-300 block w-full p-2.5"
              placeholder="confirm password"
            />
          </div>
          <p className={`text-xs ${isMismatched ? "text-textWarning": "text-secondryText"}`}>{isMismatched ? "password mismatched please try again." : "please re-enter your password here to continue."}</p>
        </div>
        <div className="flex flex-row">
          <div className="flex-grow text-left">
            <Button
              variant="secondary"
              className="border-none uppercase py-0 md:py-0 px-0"
              onClick={() => setScreenNumber((prev) => prev - 1)}
            >
              Back
            </Button>
          </div>
          <div className="flex-grow text-right">
            <Button
              variant="secondary"
              className="border-none uppercase py-0 md:py-0 px-0 text-verified disabled: bg-transparent"
              onClick={handleSetPassword}
              disabled={!confirmPassword}
            >
              set password
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmPassword;
