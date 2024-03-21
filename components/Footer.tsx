import React from 'react'

const Footer = () => {
  return (

    <div className='flex flex-row justify-between w-1/4 text-sm font-light text-gray-500 border-b-2 border-gray-500'>
      <div className='flex flex-col items-start gap-2'>
        <span className='-ml-12 '>backed by</span>
        <span className='self-start h-6 border-l-2 border-gray-500'></span>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <span className=''>outlier ventures</span>
        <span className='h-6 border-l-2 border-gray-500'></span>
      </div>
      <div className='flex flex-col items-end gap-2'>
        <span className='-mr-16 '>plassa capital</span>
        <span className='self-end h-6 border-l-2 border-gray-500'></span>
      </div>
    </div>
  )
}

export default Footer