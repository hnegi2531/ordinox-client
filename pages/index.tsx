import Head from "next/head";
import { Inter } from "next/font/google";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { baseURL } from "@/apis/axios";
import { fetchUserInfo } from "@/apis/users";
import { AxiosError } from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center justify-center gap-8 mb-20 max-w-lg text-center">
          <div>
            <h1 className="text-3xl text-brand-300 text-center">brdiging native liquidity seamlessly</h1>
          </div>

          <div className="max-w-md">
            <p className="text-sm">
              Ordinox facilitates a native cross-chain swap between ERC20 tokens and Bitcoin Inscriptions / Runes based
              tokens
            </p>
          </div>

          <div className="max-w-sm">
            <Button variant="primary" className="uppercase w-full" onClick={() => router.push("/authenticate")}>
              join early access
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 left-28 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h5 className="uppercase font-semibold text-red-500 text-sm">users</h5>
          <p className="text-4xl text-white font-semibold tracking-wider">1095</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="uppercase font-semibold text-red-500 text-sm">deposits</h5>
          <p className="text-4xl text-white font-semibold tracking-wider">$10,455</p>
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
    const userInfo = await fetchUserInfo(authToken);
    const getDest = (): string | null => {
      if (userInfo?.EthAddress && userInfo?.Invite?.Code) return "/score";
      if (userInfo?.EthAddress && !userInfo?.Invite?.Code) return "/invite";
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
