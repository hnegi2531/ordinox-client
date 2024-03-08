import React from 'react'

const Footer = () => {
  return (
    
    <div className='flex flex-row justify-between border-b-2 w-1/4'> 
      <div className='flex flex-col items-start'>
        <span className='text-white -ml-10 text-xs'>backed by</span>
        <span className='border-l-2 border-white h-6 self-start'></span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-white text-xs'>outlier ventures</span>
        <span className='border-l-2 border-white h-6'></span>
        </div>
      <div className='flex flex-col items-end'>
        <span className='text-white -mr-10 text-xs'>plassa capital</span>
        <span className='border-l-2 border-white h-6 self-end'></span>
        </div>
    </div>
  )
}

export default Footer