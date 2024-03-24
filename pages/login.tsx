import AuthenticaionPopup from "@/components/AuthenticaionPopup";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twitterImageData } from "../utils/constants";
import { baseURL } from "../apis/axios";
import { useUserInfo } from "@/hooks/queries/useUser";
import { ROUNDS } from "@/utils/helper";

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    if (userInfo && !userInfo?.EthAddress && !userInfo?.Invite?.Code) setShowModal(true);
  }, [userInfo?.EthAddress, userInfo?.Invite?.Code]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full gap-8 px-4 md:px-20 md:flex-row ">
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl text-brand-300">claim ordinox points</h1>
          <p className="max-w-lg text-xl leading-6 text-justify text-white">
            Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based
            tokens
          </p>
          <div>
            <Button
              variant="primary"
              loading={loading}
              disabled={loading}
              className="flex items-center gap-4 text-lg font-semibold uppercase bg-white font-poppins"
              onClick={() => {
                setLoading(true);
                window.location.href = `${baseURL}/auth/twitter`;
              }}
            >
              <span>log in / sign up</span> <img height={20} width={20} src={twitterImageData} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:items-center md:flex-row">
          {ROUNDS.map((round) => (
            <div
              key={round.number}
              className={`flex-1 flex flex-col gap-1 justify-end uppercase border-b-2 pb-4 ${
                round.isComplete ? "border-roundBorder" : ""
              }`}
            >
              <div className="relative h-28 w-28">
                <Image src={round.imageUrl} alt={`round-${round.number}`} layout="fill" />
              </div>

              <span
                className={`text-sm font-poppins ${round.isComplete ? "text-white" : "text-gray-400"} font-extralight `}
              >
                {round.text1}
              </span>
              <span className={`text-sm ${round.isComplete ? "text-green-400" : "text-gray-500"}`}>{round.text2}</span>
              <span className={`text-sm font-bold ${round.isComplete ? "text-white" : "text-gray-300"}`}>
                {round.date}
              </span>
            </div>
          ))}
        </div>
      </div>
      {showModal && <AuthenticaionPopup closeModal={closeModal} />}
    </div>
  );
};

export default Authenticate;
