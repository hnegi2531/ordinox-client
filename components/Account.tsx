import React, { useState } from "react";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AccountDetails from "./AccountDetails";
import AccountPassword from "./AccountPassword";
import AccountPrivateKey from "./AccountPrivateKey";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [screenNumber, setScreenNumber] = useState<number>(0);
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const closeModal = () => {
    setScreenNumber(0);
    setPassword('');
    setPrivateKey('');
    setIsOpen(false);
  };

  const getScreen = () => {
    switch (screenNumber) {
      case 0:
        return <AccountDetails setScreenNumber={setScreenNumber} />;
      case 1:
        return <AccountPassword password={password} setPassword={setPassword} setScreenNumber={setScreenNumber} setPrivateKey={setPrivateKey} />;
      case 2:
        return <AccountPrivateKey privateKey={privateKey} />;
      default:
        break;
    }
  };


  return (
    <div>
      <div
        className="font-semibold uppercase cursor-pointer text-brand-600 hover:text-brand-500 font-poppins"
        onClick={() => {
          setIsOpen(true);
        }}>
        Account
      </div>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col px-8 py-8 border border-gray-300 rounded-lg shadow-xl max-h-fit w-96 bg-popUp bg-opacity-80 backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150">
              <span
                onClick={closeModal}
                className="absolute cursor-pointer right-5 top-5">
                <IoMdCloseCircleOutline className="text-2xl text-textWarning" />
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-grow">
                  {getScreen()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}
    </div>
  );
};

export default Account;
