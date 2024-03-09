import Button from '@/components/Button'
import React from 'react'

const Score = () => {
  return (
    <div className='h-full w-full flex flex-row items-center px-20'>
     
      <div className='flex-1 flex flex-col gap-12'>
        <div className='flex flex-col gap-4 max-w-md'>
          <h1 className='text-3xl text-brand-300'>fund account with usdt or ETH to ordinox points</h1>
          <p className='text-sm'>withdrawing your funds during phase 0 will reset your points. min balance $10 </p>
          <p className='text-sm'>points will be redeemable in phase 2</p>
        </div>
        <div className='flex flex-col gap-4 max-w-md'>
          <h1 className='text-3xl text-brand-300'>your balance</h1>
          <h1 className='text-3xl text-brand-300'>$0.00</h1>

          <p className='text-sm'>balance will update every ~10 mins </p>
          <div>
            <Button variant='primary' className='uppercase'>claim ordinox points</Button>
          </div>
          <p className='uppercase text-sm text-brand-300'>eligible tokens</p>
        </div>
      </div>
      <div className='flex-1'>asx</div>

    </div>
    
  )
}

export default Score