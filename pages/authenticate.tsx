import Button from '@/components/Button'
import Modal from '@/components/Modal'
import React, { useState } from 'react'

const rounds = [
  {
    number: 0,
    text1: "early access",
    text2: "earn ordinox points",
    date: "march 2024",
    isComplete: true,
  },

  {
    number: 1,
    text1: "app launch",
    text2: "incentivised testnet",
    date: "may 2024",
    isComplete: false,
  },

  {
    number: 2,
    text1: "revelations",
    text2: "redeem ordinox points",
    date: "-",
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
          <h1 className='text-4xl text-brand-300'>claim ordinox points</h1>
          <p className='text-xl text-brand-300 text-justify max-w-lg'>Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based tokens</p>
          <div>
            <Button variant='primary' className='uppercase' onClick={() => setShowModal(true)}>log in/sign up</Button>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex flex-row items-center justify-between gap-8 border-b-2'>
            {rounds.map((round) => (
              <div key={round.number} className={`flex flex-col uppercase mb-2`}>
                  <h2 className='text-3xl text-white mb-2'>Round <span className={`${round.isComplete? "text-red-400": ""}`}>{round.number}</span></h2>
                  <span className='text-white'>{round.text1}</span>
                  <span className={`${round.isComplete? "text-green-400": "text-white"}`}>{round.text2}</span>
                  <span className='text-white'>{round.date}</span>
              </div>
            ))}
        </div>
      </div>
          {showModal && <Modal closeModal={closeModal}/>}
    </div>
   
  )
}

export default Authenticate