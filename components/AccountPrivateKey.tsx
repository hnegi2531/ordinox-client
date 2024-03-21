import React, { useState } from 'react'
import PasswordInput from './PasswordInput';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';

type AccountPrivateKeyProps = {
  privateKey: string;
};

const AccountPrivateKey = ({ privateKey }: AccountPrivateKeyProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-stretch justify-between flex-grow gap-28">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold uppercase">Export Private Key</h1>
        <div>
          <label htmlFor="password" className="inline-block mb-2 text-sm font-medium text-secondryText">
            copy private key
          </label>
          <div className='flex items-center gap-4'>
            <div className='w-full'>
              <PasswordInput
                id="private-key"
                placeholder="private key"
                value={privateKey}
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={copyToClipboard}
              className={`${copied ? "text-verified" : "text-secondryText"} `}
            >
              {copied ? <FaClipboardCheck /> : <FaClipboard />}
            </button>
          </div>
          <p className="mt-4 text-sm text-teal-100">
            never share your private key with anyone. it controls your account.
          </p>
        </div>
      </div>
      <div />
    </div>
  )
}

export default AccountPrivateKey