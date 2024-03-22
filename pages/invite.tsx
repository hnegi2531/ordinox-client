import { fetchUserInfo } from "@/apis/users";
import Button from "@/components/Button";
import OTPInput from "@/components/OTPInput";
import { useReedemInvite } from "@/hooks/mutations/useAddAddress";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
const Discord = () => {
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { mutate: reedemInviteMutation, isPending: reedemInviteMutationLoading } = useReedemInvite();

  const handleOTPChange = (otp: string) => {
    setOtp(otp);
  };

  const handleInvite = () => {
    if (otp.length < 6) {
      toast.error("Invalid invite code");
      return;
    }
    reedemInviteMutation(otp.toString(), {
      onSuccess: () => {
        router.push("/earn");
      },
      onError: () => {
        toast.error("Invalid invite code");
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col max-w-lg gap-20">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl text-center text-brand-300">enter invite code</h1>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-center">
              in order to deposit funds into your ordinox trading wallet and start earning points enter your invite code{" "}
            </p>
          </div>
          <div className="flex items-center justify-center w-full gap-2">
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

        <div className="flex items-center justify-center w-full px-10 text-center">
          <Button
            variant="primary"
            loading={reedemInviteMutationLoading}
            disabled={reedemInviteMutationLoading}
            className="w-full uppercase"
            onClick={handleInvite}
          >
            redeem invite code
            {/* <span><Image ></span> */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Discord;

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
      if (userInfo?.EthAddress && userInfo?.Invite?.Code) return "/earn";
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
