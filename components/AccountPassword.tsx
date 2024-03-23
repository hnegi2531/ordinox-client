import React, { ChangeEvent, useCallback } from 'react'
import PasswordInput from './PasswordInput';
import Button from './Button';
import { decryptWithAES } from '../utils/crypto';
import toast from 'react-hot-toast';

type AccountPasswordProps = {
  password: string;
  setPassword: (value: string | ((prevVar: string) => string)) => void;
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
  setPrivateKey: (value: string | ((prevVar: string) => string)) => void;
};
const AccountPassword = ({ password, setPassword, setPrivateKey, setScreenNumber }: AccountPasswordProps) => {

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const proceedHandler = () => {
    if (!password) return;
    const ordinoxPrivateKey = localStorage.getItem('ordinoxKey')
    if (!ordinoxPrivateKey) {
      toast.error('Login from the device where you first created your account')
      return;
    }
    try {
      const privateKey = decryptWithAES({
        ciphertext: ordinoxPrivateKey,
        password
      })
      if (!privateKey) throw new Error('Wrong password')
      setPrivateKey(privateKey);
      setScreenNumber((prev) => prev + 1);
    } catch (error) {
      toast.error('Wrong password')
    }
  };

  return (
    <div className="flex flex-col items-stretch justify-between flex-grow gap-28">
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold uppercase">Enter Password</h1>
        <div>
          <label htmlFor="password" className="inline-block mb-2 text-sm font-medium text-secondryText">
            password
          </label>
          <PasswordInput
            id="password"
            placeholder="password"
            value={password}
            onChangeHandler={handlePasswordChange}
          />
        </div>
        <p className="text-sm text-teal-100">
          please re-enter your password here to continue.
        </p>
      </div>
      <div className="flex-grow text-right">
        <Button
          variant="secondary"
          className="px-0 py-0 uppercase border-none md:py-0 text-secondryText hover:text-white disabled:text-gray-500"
          onClick={proceedHandler}
          disabled={password ? false : true}
        >
          Proceed
        </Button>
      </div>
    </div>
  )
}

export default AccountPassword