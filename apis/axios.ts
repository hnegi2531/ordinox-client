import axios, { AxiosRequestConfig } from "axios";

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("auth_token");
  } else {
    return null;
  }
};

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const baseURL = "http://straddle.abstractly.in:7890";

const axiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(async function (config) {
  const token = getAuthorizationHeader();
  config.headers.Authorization = token;
  return config;
});

axiosInstance.interceptors.response.use(
  async function (result) {
    // const apiName = result?.config?.url;
    // console.log(`API result ${apiName}`, result);
    return result;
  },
  async function (error) {
    const apiName = error?.config?.url;
    console.log(`API error ${apiName}`, error);

    if (error.code === "ECONNABORTED") {
      // eslint-disable-next-line no-throw-literal
      throw { customMsg: "Damn! something broke." };
    }
    throw error?.response?.data;
  }
);

export const AXIOS = async (config: AxiosRequestConfig) => {
  const getRes = await axiosInstance(config);
  return getRes.data;
};

export const api = { AXIOS };
