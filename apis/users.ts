import axios, { AxiosError } from "axios";
import { api, baseURL } from "./axios";

export interface UserInfoType {
  CreatedAt: string;
  Nickname: string;
  TwitterHandle: string;
  Username: string;
  Email: string;
  Userid: string;
  ImgUrl: string;
  Points: number;
  UnclaimedPoints: number;
  IsVerified: boolean;
  VerifiedAt: string;
  EthAddress: string;
  EthAddressGeneratedAt: string;
  Invite: Invite;
  UsedInviteUsername: string;
  UsedInviteCodeID: number;
  InviteUsedAt: string;
  Invites: any[];
  HasAppliedInvite: boolean;
  PointsHistory: any[];
  LastEthBalance: string;
  LastUsdtBalance: string;
  LoggedInAt: string;
  HasDeposited: boolean;
  Tier: string;
}

export interface Invite {
  ID: number;
  Code: string;
  IsUsed: boolean;
  UsedByUsername: any;
  UsedByID: number;
  CreatedByUsername: string;
  EthDeposited: number;
  UsdtDeposited: number;
  Points: number;
  TotalKickback: number;
  CreatedAt: string;
}

export const getUser = async (): Promise<UserInfoType> => {
  const res = await api.AXIOS({
    url: `/user/profile`,
    method: "get",
  });
  return res;
};

export const generateInviteCode = async (): Promise<Invite> => {
  const res = await api.AXIOS({
    url: `/invite/generate`,
    method: "post",
  });
  return res;
};

export const addAddress = async (address: string): Promise<string> => {
  return await api.AXIOS({
    url: `/user/address/set`,
    method: "post",
    data: {
      address,
    },
  });
};

export const claimPoints = async (): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return await api.AXIOS({
    url: `/user/claim`,
    method: "post",
    data: {},
  });
};

export const reedemInvite = async (inviteCode: string): Promise<string> => {
  return await api.AXIOS({
    url: `/invite/apply`,
    method: "post",
    data: {
      invite_code: inviteCode,
    },
  });
};

export async function fetchUserInfo(token: string): Promise<UserInfoType> {
  const res = await axios.get(`${baseURL}/user/profile`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
}
