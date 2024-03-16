import { useRouter } from "next/router";
import React, { use, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

import AccountCreated from "./AccountCreated";
import AccountSecured from "./AccountSecured";
import Authenticate from "./Authenticate";
import ConfirmPassword from "./ConfirmPassword";
import SecureAccount from "./SecureAccount";
import SetPassword from "./SetPassword";

type AuthenticaionPopupProps = {
  closeModal: () => void;
};

const AuthenticaionPopup: React.FC<AuthenticaionPopupProps> = ({ closeModal }) => {
  const [screenNumber, setScreenNumber] = useState<number>(0);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClose = () => {

    if(screenNumber === 5) router.push('/invite');
    closeModal();
  }

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
      <div className="h-[55%] w-80 relative bg-popUp px-6 py-4 flex flex-col">
        <span onClick={handleClose} className="self-end cursor-pointer">
          <IoMdCloseCircleOutline className="text-textWarning text-2xl" />
        </span>
        <div className="flex-grow flex flex-col">{getScreen()}</div>
      </div>
    </React.Fragment>
  );
};

export default AuthenticaionPopup;
