import Head from "next/head";
import { Inter } from "next/font/google";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { baseURL } from "@/apis/axios";
import { fetchUserInfo } from "@/apis/users";
import { AxiosError } from "axios";
import { useTypingText } from "../hooks/useTypingText";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { word } = useTypingText({
    words: ["bridging native liquidity seamlessly", "native cross-chain swap"],
    keySpeed: 60,
    maxPauseAmount: 20,
  });

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-between h-full max-w-6xl gap-8 mb-20 text-center md:justify-center">
          <div className="flex flex-col items-center gap-4 py-12 md:py-0">
            <h1 className="text-5xl text-center text-brand-300">{word}</h1>
            <div className="max-w-lg">
              <p className="font-light text-white">
                Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based
                tokens
              </p>
            </div>
          </div>



          <div className="max-w-sm mb-20 md:mb-0">
            <Button
              variant="primary"
              className="flex items-center w-full gap-4 px-20 text-lg font-semibold uppercase font-poppins"
              onClick={() => router.push("/login")}
            >
              <span>join early access</span>{" "}
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.25 3.75V8.25M4.25 3.75H8.75M4.25 3.75L9.5 9M4.25 20.25V15.75M4.25 20.25H8.75M4.25 20.25L9.5 15M20.75 3.75H16.25M20.75 3.75V8.25M20.75 3.75L15.5 9M20.75 20.25H16.25M20.75 20.25V15.75M20.75 20.25L15.5 15"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-col hidden gap-6 md:flex md:absolute md:bottom-40 md:left-28">
        <div className="flex flex-col gap-2">
          <h5 className="text-xl font-semibold text-red-500 uppercase font-poppins">users</h5>
          <p className="text-6xl font-normal text-white">1095</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-xl font-semibold text-red-500 uppercase font-poppins">deposits</h5>
          <p className="text-6xl font-normal text-white">$10,455</p>
        </div>
      </div>
    </>
  );
}

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

    // userInfo = { ...userInfo, EthAddress: "", Invite: { ...userInfo.Invite, Code: "" } };
    const getDest = (): string | null => {
      if (userInfo?.EthAddress && userInfo?.Invite?.Code) return "/profile";
      if (userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/invite";
      // if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/login";
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
