import React, { useState } from "react";
import { useUserInfo } from "../hooks/queries/useUser";
import { shortenAddress } from "../utils/crypto";
import toast from "react-hot-toast";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

type AccountDetailsProps = {
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
  closeModal: () => void;
};

const AccountDetails = ({ setScreenNumber, closeModal }: AccountDetailsProps) => {
  const [copied, setCopied] = useState(false);
  const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["user"] });
  const router = useRouter();

  const copyToClipboard = () => {
    toast.success("Copied successfully");
    navigator.clipboard.writeText(userInfo?.EthAddress ?? "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const logoutHandler = () => {
    closeModal();
    Cookies.remove("auth_token");
    localStorage.removeItem("auth_token");
    // queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
    router.push("/");
  };

  return (
    <div className="flex flex-col flex-grow gap-32">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg text-teal-100 uppercase">Account</h1>
        <div>
          <img src={userInfo?.ImgUrl} className="p-1 border-2 rounded-full border-brand-300" />
        </div>
        <p className="text-brand-300">
          USERNAME - <span className="text-white">{userInfo?.Nickname}</span>
        </p>
        <p className="text-brand-300">
          TWITTER - <span className="text-white">{userInfo?.Email}</span>
        </p>
        <p className="flex gap-2 text-brand-300">
          <span>WALLET ADDRESS - </span>
          <div className="flex items-center gap-2">
            <span className="text-white">{shortenAddress(userInfo?.EthAddress ?? "")}</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className={`flex items-center ${copied ? "text-verified" : "text-secondryText"} `}
            >
              {copied ? <FaClipboardCheck /> : <FaClipboard />}
            </button>
          </div>
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p
          className="font-bold text-gray-400 uppercase cursor-pointer hover:text-gray-300"
          onClick={() => {
            setScreenNumber(1);
          }}
        >
          Export Private Key
        </p>
        <span className="text-red-400 uppercase cursor-pointer hover:text-red-500 select-none" onClick={logoutHandler}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default AccountDetails;
