import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import AccountCreated from "./AccountCreated";
import AccountSecured from "./AccountSecured";
import Authenticate from "./Authenticate";
import ConfirmPassword from "./ConfirmPassword";
import SecureAccount from "./SecureAccount";
import SetPassword from "./SetPassword";
import { AnimatePresence, motion } from "framer-motion";

type AuthenticaionPopupProps = {
  closeModal: () => void;
};

const AuthenticaionPopup: React.FC<AuthenticaionPopupProps> = ({ closeModal }) => {
  const [screenNumber, setScreenNumber] = useState<number>(0);
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
    <React.Fragment>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-[55%] w-80 relative bg-popUp px-6 py-4 flex flex-col bg-opacity-80 rounded-lg border border-gray-300 shadow-xl backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150"
        >
          <span onClick={handleClose} className="self-end cursor-pointer">
            <IoMdCloseCircleOutline className="text-textWarning text-2xl" />
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={screenNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-grow flex flex-col"
            >
              {getScreen()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default AuthenticaionPopup;