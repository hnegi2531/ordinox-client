import AuthenticaionPopup from "@/components/AuthenticaionPopup";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUserInfo } from "@/hooks/queries/useUser";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { fetchUserInfo } from "@/apis/users";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

const rounds = [
  {
    number: 0,
    text1: "early access",
    text2: "earn ordinox points",
    date: "march 2024",
    imageUrl: "/round0.png",
    isComplete: true,
  },

  {
    number: 1,
    text1: "app launch",
    text2: "incentivised testnet",
    date: "may 2024",
    imageUrl: "/round1.png",
    isComplete: false,
  },

  {
    number: 2,
    text1: "revelations",
    text2: "redeem ordinox points",
    date: "-",
    imageUrl: "/round2.png",
    isComplete: false,
  },
];

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [isUsernameGenerated, setIsUserNameGenerated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (typeof router?.query?.token === "string") {
        Cookies.set("auth_token", router?.query?.token);
        localStorage.setItem("auth_token", router?.query?.token);
        const token = router?.query?.token ? `Bearer ${router?.query?.token}` : "";
        let userInfo = await fetchUserInfo(token);
        // userInfo = { ...userInfo, Invite: {}, EthAddress: "" };
        // userInfo = {...userInfo, Invite:{}}

        if (userInfo?.EthAddress && !userInfo?.Invite?.Code) router.push("/invite");

        if (userInfo?.EthAddress && userInfo?.Invite?.Code) router.push("/score");

        if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) setShowModal(true);
      }
    })();
  }, [router?.query?.token]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-row items-center h-full w-full px-20">
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl text-brand-300">claim ordinox points</h1>
          <p className="text-sm text-justify max-w-lg">
            Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based
            tokens
          </p>
          <div>
            <Button
              variant="primary"
              className="uppercase"
              onClick={() => (window.location.href = "http://straddle.abstractly.in:7890/auth/twitter")}
            >
              log in/sign up
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-row items-center">
          {rounds.map((round) => (
            <div
              key={round.number}
              className={`flex-1 flex flex-col justify-end uppercase border-b-2 pb-4 ${
                round.isComplete ? "border-roundBorder" : ""
              }`}
            >
              <div className="relative h-28 w-28">
                <Image src={round.imageUrl} alt={`round-${round.number}`} layout="fill" />
              </div>

              <span className="text-sm">{round.text1}</span>
              <span className={`text-sm ${round.isComplete ? "text-green-400" : ""}`}>{round.text2}</span>
              <span className="text-sm">{round.date}</span>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <AuthenticaionPopup closeModal={closeModal} isUserNameGenerated={isUsernameGenerated} />
        </Modal>
      )}
    </div>
  );
};

export default Authenticate;

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
      if (userInfo?.EthAddress && userInfo?.Invite?.Code) return "/score";
      return null;
    };
    redirectLocation = getDest();
  } catch (error) {
    const err = error as AxiosError;
    if (err?.response?.status === 401) {
      redirectLocation = null;
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
