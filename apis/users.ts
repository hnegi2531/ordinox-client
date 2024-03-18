import axios, { AxiosError } from "axios";
import { api, baseURL } from "./axios";

export interface UserInfoType {
  CreatedAt: string;
  Username: string;
  Email: string;
  Userid: string;
  ImgUrl: string;
  Points: number;
  IsVerified: boolean;
  VerifiedAt: string;
  EthAddress: string;
  EthAddressGeneratedAt: string;
  Invite: any;
  UsedInviteUsername: string;
  InviteUsedAt: string;
  Invites: any[];
  PointsHistory: any[];
  LastEthBalance: number;
  LastUsdtBalance: number;
  LoggedInAt: string;
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
  // return res.data;
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
