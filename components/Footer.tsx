import React from 'react'

const Footer = () => {
  return (

    <div className='flex flex-row justify-between w-1/4 text-lg font-light border-b-2'>
      <div className='flex flex-col items-start gap-2'>
        <span className='-ml-12 text-white'>backed by</span>
        <span className='self-start h-6 border-l-2 border-white'></span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <span className='text-white '>outlier ventures</span>
        <span className='h-6 border-l-2 border-white'></span>
      </div>
      <div className='flex flex-col items-end gap-2'>
        <span className='-mr-16 text-white'>plassa capital</span>
        <span className='self-end h-6 border-l-2 border-white'></span>
      </div>
    </div>
  )
}

export default Footer