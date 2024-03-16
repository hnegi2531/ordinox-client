import { fetchUserInfo } from "@/apis/users";
import Button from "@/components/Button";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import QRCode from "react-qr-code";

const Profile = () => {
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
            <Button variant="primary" className="uppercase">
              claim ordinox points
            </Button>
          </div>
          <p className="uppercase text-sm text-brand-300">eligible tokens</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">

      <div className="flex flex-col items-center gap-4 p-4 border-2 border-brand-300">
        <h1 className="uppercase text-brand-300 text-xl font-semibold">your wallet address</h1>
        <div className="flex items-center justify-center">
          <QRCode value="" size={200}/>
        </div>

        <span>asxasxasx</span>
        <p><span className="uppercase text-sm text-brand-300">network: </span><span>Etherium</span></p>
      </div>

      </div>
    </div>
  );
};

export default Profile;

type PageProps = {
  isAuthanticated: boolean;
  categories?: string;
}
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  let authToken = context.req.headers.cookie;
  authToken = authToken?.split("auth_token=")[1] ? `Bearer ${authToken?.split("auth_token=")[1]}`: "";

  let redirectLocation: string | null = "";
  try {
    const userInfo = await fetchUserInfo(authToken);
    const getDest = (): string | null => {
      if(userInfo?.EthAddress && !userInfo?.Invite?.Code) return '/invite';
      if(!userInfo?.EthAddress && !userInfo?.Invite?.Code) return '/authenticate';
      return null;
    }
    redirectLocation =  getDest();
  } catch (error) {
    const err = error as AxiosError
    if(err?.response?.status === 401){
      redirectLocation = '/';
    }
  }

  const redirectConfig = {
    permanent: false,
    destination: redirectLocation
  }

  const _props: PageProps = {
    isAuthanticated: true,
    categories: "anshuhim"
  }


  const returnValue = redirectLocation ? {
    redirect: redirectConfig, 
    props: _props 
  }: {
    props: _props 
  }
  return returnValue
};
