import React, { useCallback, useMemo } from "react";
import Button from "./Button";

import { ethers } from "ethers";
import { useAddAddress } from "@/hooks/mutations/useAddAddress";
import { encryptWithAES } from "@/utils/crypto";
import PreviewInput from "./PreviewInput";

type SecureAccountProps = {
  password: string;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const SecureAccount: React.FC<SecureAccountProps> = ({ password, setScreenNumber }) => {
  const finaPassword = useMemo(() => password, [password]);
  const wallet = useMemo(() => ethers.Wallet.createRandom(), []);
  // ethers.parseUnits

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

  return (
    <div className="flex-grow flex flex-col items-stretch justify-between gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="uppercase font-semibold">secure your account</h1>
        <p className="text-xs text-secondryText">store your password and private key somewhere safe.</p>
        <div>
          <label htmlFor="finalPassword" className="text-secondryText inline-block mb-2 text-sm font-medium">
            password
          </label>
          <PreviewInput id="finalPassword" value={finaPassword} disabled />
        </div>
        <div>
          <label htmlFor="privateKey" className="text-secondryText inline-block mb-2 text-sm font-medium">
            private key
          </label>
          <PreviewInput id="privateKey" value={wallet?.privateKey} disabled />
        </div>
        <p className="text-xs">I understand losing these means losing the ability to access my account.</p>
      </div>
      <div className="text-right">
        <Button
          variant="secondary"
          className="py-0 md:py-0 px-0 border-none text-right uppercase text-verified"
          onClick={handleContinue}
          disabled={addAddressLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SecureAccount;
