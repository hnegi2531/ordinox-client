import React, { useRef } from 'react'

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({children, closeModal}) => {

  const modalRef = useRef<null | HTMLDivElement>(null);

  const closeOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(modalRef?.current === e?.target){
      closeModal();
    }
  }

  return (
    <div ref={modalRef} onClick={closeOnClick} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm text-white flex justify-center items-center'>
      {children}
    </div>
  )
}

export default Modal