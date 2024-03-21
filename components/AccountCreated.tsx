import React from "react";
import Button from "./Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUserInfo } from "@/hooks/queries/useUser";

type AccountCreatedProps = {
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const AccountCreated: React.FC<AccountCreatedProps> = ({ setScreenNumber }) => {
  const { data: userInfo } = useUserInfo();
  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-between gap-32">
        <div className="text-center flex flex-col gap-4">
          <h1 className="font-semibold uppercase">Account Created</h1>
          <p>{userInfo?.Nickname}</p>
          <p className="text-sm text-secondryText">
            this is your auto generated username. you can change it whenever you’d like
          </p>
        </div>

        <Button
          variant="secondary"
          className="border-none uppercase flex items-center gap-2 font-bold py-0 md:py-0 px-0 text-secondryText hover:text-white"
          onClick={() => setScreenNumber((prev) => prev + 1)}
        >
          <span>Secure Account</span>
          <span>
            <FaArrowRightLong />
          </span>
        </Button>
      </div>
    </>
  );
};

export default AccountCreated;
