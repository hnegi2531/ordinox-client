import { fetchUserInfo } from "@/apis/users";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import QRCode from "react-qr-code";
import { CiShare1 } from "react-icons/ci";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-full w-full flex flex-row items-center px-20">
      <div className="flex-1 flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="text-3xl text-brand-300">fund account with usdt or ETH to ordinox points</h1>
          <p className="text-sm">withdrawing your funds during phase 0 will reset your points. min balance $10 </p>
          <p className="text-sm">points will be redeemable in phase 2</p>
        </div>
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="text-3xl text-brand-300">your balance</h1>
          <h1 className="text-3xl text-brand-300">$0.00</h1>

          <p className="text-sm">balance will update every ~10 mins </p>
          <div>
            <Button variant="primary" className="uppercase" onClick={() => setShowModal(true)}>
              claim ordinox points
            </Button>
          </div>
          <p className="uppercase text-sm text-brand-300">eligible tokens</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-4 border-2 border-secondryText rounded-lg">
          <h1 className="uppercase text-brand-300 text-xl font-semibold">your wallet address</h1>
          <div className="flex items-center justify-center">
            <QRCode value="" size={200} />
          </div>

          <span>asxasxasx</span>
          <p>
            <span className="uppercase text-sm text-brand-300">network: </span>
            <span>Etherium</span>
          </p>
        </div>
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-[55%] w-80 relative bg-popUp px-6 py-4 flex flex-col bg-opacity-80 rounded-lg border border-gray-300 shadow-xl backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150"
            >
              <span onClick={closeModal} className="self-end cursor-pointer">
                <IoMdCloseCircleOutline className="text-textWarning text-2xl" />
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-grow flex flex-col"
                >
                  <div className="flex-grow flex flex-col mt-5">
                    <div className="flex flex-col gap-6">
                      <div>
                        <h1 className="uppercase text-brand-300 text-xs">eligible tokens</h1>
                      </div>

                      <div>
                        <p className="text-xs">we will track deposits made in usdt or eth only.</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-between">
                          <span className="text-xs">1. USDT</span>
                          <span>
                            <CiShare1 />
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                          <span className="text-xs">2. ETH</span>
                          <span>
                            <CiShare1 />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow flex flex-row">
                      <p className="text-xs self-end mb-10">min balance to begin earning ordinox points is $10</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}
    </div>
  );
};

export default Profile;

type PageProps = {
  isAuthanticated: boolean;
  categories?: string;
};
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  let authToken = context.req.headers.cookie;
  authToken = authToken?.split("auth_token=")[1] ? `Bearer ${authToken?.split("auth_token=")[1]}` : "";

  let redirectLocation: string | null = "";
  try {
    const userInfo = await fetchUserInfo(authToken);
    const getDest = (): string | null => {
      if (userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/invite";
      if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/authenticate";
      return null;
    };
    redirectLocation = getDest();
  } catch (error) {
    const err = error as AxiosError;
    if (err?.response?.status === 401) {
      redirectLocation = "/";
    }
  }

  const redirectConfig = {
    permanent: false,
    destination: redirectLocation,
  };

  const _props: PageProps = {
    isAuthanticated: true,
    categories: "anshuhim",
  };

  const returnValue = redirectLocation
    ? {
        redirect: redirectConfig,
        props: _props,
      }
    : {
        props: _props,
      };
  return returnValue;
};
