import AuthenticaionPopup from "@/components/AuthenticaionPopup";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { fetchUserInfo } from "@/apis/users";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import { twitterImageData } from "../utils/constants";
import { baseURL } from "../apis/axios";

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
    date: "h2 2024",
    imageUrl: "/round2.png",
    isComplete: false,
  },
];

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (typeof router?.query?.token === "string") {
        Cookies.set("auth_token", router?.query?.token);
        localStorage.setItem("auth_token", router?.query?.token);
        const token = router?.query?.token ? `Bearer ${router?.query?.token}` : "";
        let userInfo = await fetchUserInfo(token);
        if (userInfo?.EthAddress && !userInfo?.Invite?.Code) router.push("/invite");

        if (userInfo?.EthAddress && userInfo?.Invite?.Code) router.push("/earn");

        if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) router.push("/login");
      }
    })();
  }, [router?.query?.token]);

  return <div className="flex flex-row items-center w-full h-full gap-8 px-20 "></div>;
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
      if (userInfo?.EthAddress && userInfo?.Invite?.Code) return "/earn";
      if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/login";
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
