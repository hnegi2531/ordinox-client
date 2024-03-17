import { fetchUserInfo, getUserGenerate } from "@/apis/users";
import Button from "@/components/Button";
import OTPInput from "@/components/OTPInput";
import { useReedemInvite } from "@/hooks/mutations/useAddAddress";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

const Discord = () => {
  const [otp, setOtp] = useState("");

  // useEffect(() => {
  //   getUserGenerate();
  // }, [])
  

  const {mutate: reedemInviteMutation} = useReedemInvite();

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  const handleInvite = () => {
    reedemInviteMutation(otp.toString());
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-lg flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-brand-300 text-center">enter invite code</h1>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-center">
              in order to deposit funds into your ordinox trading wallet and start earning points enter your invite code{" "}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <OTPInput
              inputStyle="bg-transparent text-center border w-8 rounded-md px-2 py-2"
              numInputs={6}
              onChange={handleOTPChange}
              // renderSeparator={<span>{separator}</span>}
              value={otp}
              inputType={"text"}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              skipDefaultStyles
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center text-center px-10">
            <Button variant="primary" className="uppercase w-full" onClick={handleInvite}>redeem invite code</Button>
          </div>
      </div>
    </div>
  );
};

export default Discord;

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
      if(userInfo?.EthAddress && userInfo?.Invite?.Code) return '/score';
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

