import React, { useRef } from 'react'

type ModalProps = {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({closeModal}) => {

  const modalRef = useRef<null | HTMLDivElement>(null);

  const closeOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(modalRef?.current === e?.target){
      closeModal();
    }
  }

  return (
    <div ref={modalRef} onClick={closeOnClick} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-white flex justify-center items-center'>
      <div className='flex flex-col bg-black h-28'>
          <span onClick={closeModal} className="cursor-pointer">X</span>
          <label htmlFor="ordinox-acount-email">Email</label>
          <input id='ordinox-acount-email' className='max-w-md' />
      </div>
    </div>
  )
}

export default Modal