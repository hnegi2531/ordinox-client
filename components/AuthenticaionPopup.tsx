import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import AccountCreated from "./AccountCreated";
import AccountSecured from "./AccountSecured";
import Authenticate from "./Authenticate";
import ConfirmPassword from "./ConfirmPassword";
import SecureAccount from "./SecureAccount";
import SetPassword from "./SetPassword";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";

type AuthenticaionPopupProps = {
  closeModal: () => void;
  isUserNameGenerated: boolean;
};

const AuthenticaionPopup: React.FC<AuthenticaionPopupProps> = ({ closeModal, isUserNameGenerated }) => {
  const [screenNumber, setScreenNumber] = useState<number>(1);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClose = () => {
    if (screenNumber === 5) router.push("/invite");
    closeModal();
  };

  const getScreen = () => {
    switch (screenNumber) {
      case 0:
        return <Authenticate setScreenNumber={setScreenNumber} />;
      case 1:
        return <AccountCreated setScreenNumber={setScreenNumber} />;
      case 2:
        return <SetPassword password={password} setPassword={setPassword} setScreenNumber={setScreenNumber} />;
      case 3:
        return <ConfirmPassword password={password} setScreenNumber={setScreenNumber} />;
      case 4:
        return <SecureAccount password={password} setScreenNumber={setScreenNumber} />;
      case 5:
        return <AccountSecured />;
      default:
        break;
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col px-8 py-8 border border-gray-300 rounded-lg shadow-xl max-h-fit w-96 bg-popUp bg-opacity-80 backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150"
        >
          <span onClick={handleClose} className="absolute cursor-pointer right-5 top-5">
            <IoMdCloseCircleOutline className="text-2xl text-textWarning" />
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={screenNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-grow"
            >
              {getScreen()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default AuthenticaionPopup;
