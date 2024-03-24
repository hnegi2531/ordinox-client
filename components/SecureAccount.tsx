import React, { useCallback, useMemo, useState } from "react";
import Button from "./Button";

import { ethers } from "ethers";
import { useAddAddress } from "@/hooks/mutations/useAddAddress";
import { encryptWithAES } from "@/utils/crypto";
import PreviewInput from "./PreviewInput";
import Checkbox from "./Checkbox";

type SecureAccountProps = {
  password: string;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const SecureAccount: React.FC<SecureAccountProps> = ({ password, setScreenNumber }) => {
  const [isChecked, setIsChecked] = useState(false);

  const finaPassword = useMemo(() => password, [password]);
  const wallet = useMemo(() => ethers.Wallet.createRandom(), []);

  const { mutate: addAddressMutation, isPending: addAddressLoading } = useAddAddress();

  const handleContinue = () => {
    addAddressMutation(wallet?.address, {
      onSuccess: () => {
        const encryptedKey = encryptWithAES({ text: wallet?.privateKey, password: finaPassword });
        localStorage.setItem("ordinoxKey", encryptedKey);
        setScreenNumber((prev) => prev + 1);
      },
    });
  };

  const checkBoxOnChangeHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col items-stretch justify-between flex-grow gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold uppercase">secure your account</h1>
        <p className="text-xs text-secondryText">store your password and private key somewhere safe.</p>
        <div>
          <label htmlFor="finalPassword" className="inline-block mb-2 text-sm font-medium text-secondryText">
            password
          </label>
          <PreviewInput id="finalPassword" value={finaPassword} disabled />
        </div>
        <div>
          <label htmlFor="privateKey" className="inline-block mb-2 text-sm font-medium text-secondryText">
            private key
          </label>
          <PreviewInput id="privateKey" value={wallet?.privateKey} disabled />
        </div>
        <div className="flex flex-row items-center gap-2 mt-4">
          <div className="flex items-center justify-center">
            <Checkbox value={isChecked} onChange={checkBoxOnChangeHandler} />
          </div>
          <p className="text-xs select-none">
            I understand losing these means losing the ability to access my account.
          </p>
        </div>
      </div>
      <div className="text-right">
        <Button
          variant="secondary"
          loading={addAddressLoading}
          className="px-0 py-0 text-right uppercase border-none md:py-0 text-verified"
          onClick={handleContinue}
          disabled={addAddressLoading || !isChecked}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SecureAccount;
