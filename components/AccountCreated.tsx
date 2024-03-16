import React from 'react'
import Button from './Button'
import { FaArrowRightLong } from "react-icons/fa6";

type AccountCreatedProps = {
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const AccountCreated: React.FC<AccountCreatedProps>  = ({setScreenNumber}) => {
  return (
    <>
    <div className='flex-grow flex flex-col items-center justify-between'>
      <div className='text-center flex flex-col gap-4'>
        <h1 className='font-semibold uppercase'>Account Created</h1>
        <p>Originsz9m1</p>
        <p className='text-sm text-secondryText'>this is your auto generated username. you can change it whenever you’d like</p>
      </div>

      <Button variant='secondary' className='border-none uppercase flex items-center gap-2' onClick={() => setScreenNumber((prev) => prev + 1)} >
        <span>Secure Account</span>
      <span><FaArrowRightLong/></span>
      </Button>
    </div>
    </>
  )
}

export default AccountCreated