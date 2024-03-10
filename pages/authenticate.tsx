import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Image from 'next/image'
import React, { useState } from 'react'

const rounds = [
  {
    number: 0,
    text1: "early access",
    text2: "earn ordinox points",
    date: "march 2024",
    imageUrl: '/round0.png',
    isComplete: true,
  },

  {
    number: 1,
    text1: "app launch",
    text2: "incentivised testnet",
    date: "may 2024",
    imageUrl: '/round1.png',
    isComplete: false,
  },

  {
    number: 2,
    text1: "revelations",
    text2: "redeem ordinox points",
    date: "-",
    imageUrl: '/round2.png',
    isComplete: false,
  }
]

const Authenticate = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () =>{
    setShowModal(false)
  }
  return (
       <div className='flex flex-row items-center h-full w-full px-20'>
      <div className='flex-1'>
        <div className='flex flex-col gap-10'>
          <h1 className='text-3xl text-brand-300'>claim ordinox points</h1>
          <p className='text-sm text-justify max-w-lg'>Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based tokens</p>
          <div>
            <Button variant='primary' className='uppercase' onClick={() => setShowModal(true)}>log in/sign up</Button>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex flex-row items-center'>
            {rounds.map((round) => (
              <div key={round.number} className={`flex-1 flex flex-col justify-end uppercase border-b-2 pb-4 ${round.isComplete? "border-roundBorder": ""}`}>

                <div className='relative h-28 w-28'>
                  <Image src={round.imageUrl} alt={`round-${round.number}`} layout="fill"/>
                </div>
                  


                  <span className='text-sm'>{round.text1}</span>
                  <span className={`text-sm ${round.isComplete? "text-green-400": ""}`}>{round.text2}</span>
                  <span className='text-sm'>{round.date}</span>
              </div>
            ))}
        </div>
      </div>
          {showModal && <Modal closeModal={closeModal}/>}
    </div>
   
  )
}

export default Authenticate