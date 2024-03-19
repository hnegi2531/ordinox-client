import React, { ChangeEvent, useCallback, useState } from "react";
import Button from "./Button";
import PasswordInput from "./PasswordInput";

type SetPasswordProps = {
  password: string;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const ConfirmPassword: React.FC<SetPasswordProps> = ({
  password,
  setScreenNumber,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMismatched, setIsMismatched] = useState(false);

  const confirmPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
      if (e.target.value === "") {
        setIsMismatched(false);
      }
    },
    []
  );

  const handleSetPassword = useCallback(() => {
    if (password === confirmPassword)
      return setScreenNumber((prev) => prev + 1);
    setIsMismatched(true);
  }, [password, confirmPassword]);

  return (
    <React.Fragment>
      <div className="flex flex-col items-stretch justify-between flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold uppercase">Secure your wallet</h1>
          <div>
            <label
              htmlFor="confirm-password"
              className="inline-block mb-2 text-sm font-medium text-secondryText">
              confirm password
            </label>
            <PasswordInput
              id="confirm-password"
              placeholder="confirm password"
              value={confirmPassword}
              onChangeHandler={confirmPasswordChange}
            />
          </div>
          <p
            className={`text-xs ${
              isMismatched ? "text-textWarning" : "text-secondryText"
            }`}>
            {isMismatched
              ? "password mismatched please try again."
              : "please re-enter your password here to continue."}
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex-grow text-left">
            <Button
              variant="secondary"
              className="px-0 py-0 uppercase border-none md:py-0"
              onClick={() => setScreenNumber((prev) => prev - 1)}>
              Back
            </Button>
          </div>
          <div className="flex-grow text-right">
            <Button
              variant="secondary"
              className="px-0 py-0 uppercase border-none md:py-0"
              onClick={handleSetPassword}
              disabled={!confirmPassword}>
              set password
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmPassword;
