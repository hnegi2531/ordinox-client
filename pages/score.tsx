import { fetchUserInfo, Invite } from "@/apis/users";
import { useGenerateInviteCode } from "@/hooks/mutations/useGenerateInviteCode";
import { useUserInfo } from "@/hooks/queries/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { traceDeprecation } from "process";
import Image from "next/image";
import React from "react";
const tierData = [
  { id: 1, tier: "crawler", friendsInvited: "1-6", points: "150 + 6% points" },
  { id: 2, tier: "walker", friendsInvited: "6-10", points: "300 + 8% points" },
  { id: 3, tier: "runner", friendsInvited: "11-20", points: "600 + 11% points" },
];

const Score = () => {
  const { data: userInfo } = useUserInfo();

  const { mutate: generateInviteCodeMutation } = useGenerateInviteCode();

  const queryClient = useQueryClient();
  const generateCodeHandler = () => {
    //@ts-ignore
    generateInviteCodeMutation(null, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      },
    });
  };

  return (
    <div className="h-full w-full flex flex-row items-center px-20">
      <div className="flex-1 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-brand-300">origins hq</h1>
          <p className="text-sm">deposit funds and invite your friends to earn more points</p>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-brand-300 uppercase">points earned</h4>
            <p className="text-3xl text-brand-300">910,130</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-brand-300 uppercase">leaderboard rank</h4>
            <p className="text-3xl text-brand-300">134</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl text-brand-300 uppercase">your balance</h1>
          <p className="text-3xl text-brand-300 uppercase">$0.00</p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <span className="cursor-pointer select-none hover:text-brand-500 uppercase" onClick={generateCodeHandler}>
              generate code
            </span>
          </div>
          <div className="max-w-sm flex items-center gap-4 flex-wrap">
            {userInfo?.Invites?.map((invite: Invite, index: number) => {
              index < 3 ? (invite.IsUsed = true) : (invite.IsUsed = false);
              return (
                <>
                  <div className="relative">
                    <div
                      className={`text-sm ${
                        invite?.IsUsed
                          ? "bg-opacity-50 text-secondryText text-opacity-50 select-none cursor-default"
                          : ""
                      }`}
                    >
                      {invite.Code}
                    </div>
                    {invite.IsUsed && (
                      <div className="absolute inset-0">
                        <div className="relative h-4 w-4"></div>
                        <Image src="/i.png" alt="cut" layout="fill" />
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-sm text-brand-300">your tier</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center mb-5 text-xs text-brand-300 uppercase">
              <span className="flex-1">tier</span>
              <span className="flex-1">friends invited</span>
              <span className="flex-1">points</span>
            </div>
            {tierData?.map((data) => (
              <div className="flex items-center text-xs mb-5" key={data.id}>
                <span className="flex-1">{data.tier}</span>
                <span className="flex-1">{data.friendsInvited}</span>
                <span className="flex-1">{data.points}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-brand-300 uppercase">mystery box</span>
          <span className="uppercase">open</span>
        </div>
      </div>
    </div>
  );
};

export default Score;

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
