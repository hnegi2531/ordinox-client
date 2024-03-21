import { fetchUserInfo, Invite } from "@/apis/users";
import { useGenerateInviteCode } from "@/hooks/mutations/useGenerateInviteCode";
import { useUserInfo } from "@/hooks/queries/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
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
    <div className="flex flex-row items-center w-full h-full px-20">
      <div className="flex flex-col flex-1 gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl text-brand-300">origins hq</h1>
          <p className="text-lg font-light leading-5">deposit funds and invite your friends to earn more points</p>
        </div>
        <div className="flex flex-row gap-8 font-semibold">
          <div className="flex flex-col gap-2">
            <h4 className="uppercase text-brand-300">points earned</h4>
            <p className="text-3xl font-thin text-brand-300">910,130</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="uppercase text-brand-300">leaderboard rank</h4>
            <p className="text-3xl font-thin text-brand-300">134th</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold uppercase text-brand-300">your balance</h1>
          <p className="text-3xl uppercase text-brand-300">${userInfo?.LastUsdtBalance ?? "0.00"}</p>
        </div>
        <div className="flex flex-col max-w-lg gap-3">
          <span
            className="self-end uppercase cursor-pointer select-none hover:text-brand-500"
            onClick={generateCodeHandler}
          >
            generate code
          </span>
          <div className="flex flex-col max-w-lg gap-4 p-4 border">
            <h3 className="text-xl text-brand-300">INVITE CODES</h3>
            <div className="flex flex-wrap items-center gap-4">
              {userInfo?.Invites?.map((invite: Invite, index: number) => {
                return (
                  <>
                    <div className="relative">
                      <div
                        className={`text-lg ${
                          invite?.IsUsed
                            ? "bg-opacity-50 text-secondryText text-opacity-50 select-none cursor-default"
                            : ""
                        }`}
                      >
                        {invite.Code}
                      </div>
                      {invite.IsUsed && (
                        <div className="absolute inset-0">
                          <div className="relative w-4 h-4"></div>
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
      </div>

      <div className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col w-full gap-8">
          <h1 className="text-xl font-semibold uppercase text-brand-300">your tier</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center mb-5 uppercase text-brand-300">
              <span className="flex-1">tier</span>
              <span className="flex-1">friends invited</span>
              <span className="flex-1">points</span>
            </div>
            {tierData?.map((data) => (
              <div className="flex items-center mb-5 text-lg" key={data.id}>
                <span className="flex-1">{data.tier}</span>
                <span className="flex-1">{data.friendsInvited}</span>
                <span className="flex-1">{data.points}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* <span className="uppercase text-brand-300">mystery box</span>
          <span className="uppercase">open</span> */}
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
