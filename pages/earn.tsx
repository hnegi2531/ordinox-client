import { fetchUserInfo } from "@/apis/users";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import React, { useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import QRCode from "react-qr-code";
import { CiShare1 } from "react-icons/ci";
import { useUserInfo } from "../hooks/queries/useUser";
import { shortenAddress } from "../utils/crypto";
import { ethereumIcon, twitterImageData, usdtIcon } from "../utils/constants";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useClaimPoints } from "../hooks/mutations/useClaimPoints";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Refersh from "../components/Refersh";
import { FaDiscord } from "react-icons/fa";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const router = useRouter();
  const unClaimedPoints = useRef(0);
  const { data: userInfo } = useUserInfo();
  const queryClient = useQueryClient();
  const { mutate: claimPointsMutation, isPending: claimPointsLoading } = useClaimPoints();
  const balance = ethers.formatEther(userInfo?.LastUsdtBalance || "0");
  const closeModal = () => {
    setShowModal(false);
  };

  const closeClaimModal = () => {
    setShowClaimModal(false);
    router.push("/score");
  };

  return (
    <div className="flex flex-row items-center w-full h-full px-20">
      <div className="flex flex-col flex-1 gap-12 tracking-tight">
        <div className="flex flex-col max-w-xl gap-6 ">
          <h1 className="text-4xl tracking-tight text-brand-300">fund account with USDT to earn ordinox points</h1>
          <p className="">
            withdrawing your funds during <span className="font-bold text-white"> round 0</span>{" "}
            <span className="text-red-500">will reset your points.</span>
          </p>
          <p className="">
            points will be redeemable in <span className="font-bold text-white">round 2</span>
          </p>
          <p className="mt-4 text-red-500">MIN BALANCE $10</p>
        </div>
        <div className="flex flex-col max-w-md gap-4">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-2xl font-bold uppercase text-brand-300">your balance</h1>
            <div className="text-gray-400 cursor-pointer hover:text-gray-300">
              <Refersh />
            </div>
          </div>
          <h1 className="text-3xl font-normal text-brand-300">${balance}</h1>
          <p className="text-sm">balance will update every ~10 mins </p>
          <div>
            <Button
              variant="primary"
              className="uppercase"
              loading={claimPointsLoading}
              onClick={() => {
                unClaimedPoints.current = userInfo?.UnclaimedPoints || 0;
                claimPointsMutation(
                  {},
                  {
                    onSuccess() {
                      setShowClaimModal(true);
                      queryClient.invalidateQueries({ queryKey: ["user"] });
                    },
                  }
                );
              }}
              disabled={userInfo?.UnclaimedPoints ? (claimPointsLoading ? true : false) : true}
            >
              claim ordinox points
            </Button>
          </div>
          <p
            className="self-start text-sm uppercase cursor-pointer text-brand-300 hover:text-brand-400"
            onClick={() => setShowModal(true)}
          >
            eligible tokens
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center gap-4 p-8 border-2 border-brand-300">
          <h1 className="text-xl font-semibold uppercase text-brand-300">your wallet address</h1>
          <div className="flex items-center justify-center">
            <QRCode value={`ethereum:${userInfo?.EthAddress}`} size={200} className="border-2" />
          </div>

          <div className="flex items-center gap-2">
            <span>{shortenAddress(userInfo?.EthAddress ?? "")}</span>
            <svg
              onClick={() => {
                navigator.clipboard.writeText(userInfo?.EthAddress ?? "");
                toast.success("Copied successfully!");
              }}
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.666 2.888C12.5327 2.4163 12.2489 2.00105 11.858 1.70538C11.467 1.40972 10.9902 1.24982 10.5 1.25H7.5C6.47 1.25 5.6 1.943 5.334 2.888M12.666 2.888C12.721 3.082 12.75 3.288 12.75 3.5C12.75 3.69891 12.671 3.88968 12.5303 4.03033C12.3897 4.17098 12.1989 4.25 12 4.25H6C5.80109 4.25 5.61032 4.17098 5.46967 4.03033C5.32902 3.88968 5.25 3.69891 5.25 3.5C5.25 3.288 5.28 3.082 5.334 2.888M12.666 2.888C13.312 2.937 13.954 2.998 14.593 3.072C15.693 3.2 16.5 4.149 16.5 5.257V18.5C16.5 19.0967 16.2629 19.669 15.841 20.091C15.419 20.5129 14.8467 20.75 14.25 20.75H3.75C3.15326 20.75 2.58097 20.5129 2.15901 20.091C1.73705 19.669 1.5 19.0967 1.5 18.5V5.257C1.5 4.149 2.306 3.2 3.407 3.072C4.04804 2.99778 4.6905 2.93643 5.334 2.888"
                stroke="#EAD3AB"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <span className="text-sm uppercase text-brand-300">network: </span>
            <img src={ethereumIcon} width={24} height={20} />
            <span>Ethereum</span>
          </div>
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
              className="relative flex flex-col px-8 py-8 border border-gray-300 rounded-lg shadow-xl max-h-fit w-96 bg-popUp bg-opacity-80 backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150"
            >
              <span onClick={closeModal} className="absolute cursor-pointer right-5 top-5">
                <IoMdCloseCircleOutline className="text-2xl text-textWarning" />
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-grow"
                >
                  <div className="flex flex-col flex-grow gap-32">
                    <div className="flex flex-col gap-6">
                      <h1 className="text-lg text-teal-100 uppercase">eligible tokens</h1>
                      <p className="">we will track deposits made in usdt only.</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex items-center gap-2">
                            1. <img src={usdtIcon} width={20} height={20} />
                            <span className="">USDT</span>
                          </div>
                          <span>
                            <CiShare1 />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row flex-grow">
                      <p className="self-end text-gray-400">min balance to begin earning ordinox points is $10</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}

      {showClaimModal && (
        <Modal closeModal={closeClaimModal}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col px-8 py-8 border border-gray-300 rounded-lg shadow-xl max-h-fit w-96 bg-popUp bg-opacity-80 backdrop-filter backdrop-blur-md backdrop-brightness-75 backdrop-saturate-150"
            >
              <span onClick={closeClaimModal} className="absolute cursor-pointer right-5 top-5">
                <IoMdCloseCircleOutline className="text-2xl text-textWarning" />
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-grow"
                >
                  <div className="flex flex-col flex-grow gap-10">
                    <div className="flex flex-col gap-6">
                      <h1 className="text-lg text-center text-teal-100 uppercase">Total Points Claimed</h1>
                    </div>
                    <div className="mb-10 text-center text-8xl">{unClaimedPoints.current}</div>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        className="flex items-center gap-2 px-4 font-semibold font-poppins"
                        onClick={() => window.open("https://x.com/OrdinoxLabs?t=BK3-kcd8ptPVnJgMtT7aig&s=09", "_blank")}
                      >
                        Follow on <img src={twitterImageData} height={16} width={16} />
                      </Button>
                      <Button
                        onClick={() => window.open("https://discord.gg/PG8w4RG5jJ", "_blank")}
                        className="flex items-center gap-2 px-4 font-semibold font-poppins"
                      >
                        <span>Join Discord</span>
                        <span className="flex items-center justify-center">
                          <FaDiscord className="text-xl" />
                        </span>
                      </Button>
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
    let userInfo = await fetchUserInfo(authToken);

    const getDest = (): string | null => {
      if (userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/invite";
      if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/login";
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
