import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUserInfo } from "@/apis/users";
import Cookies from "js-cookie";

type AuthenticateProps = {};

const Authenticate: React.FC<AuthenticateProps> = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (typeof router?.query?.token === "string") {
        Cookies.set("auth_token", router?.query?.token);
        localStorage.setItem("auth_token", router?.query?.token);
        const token = router?.query?.token ? `Bearer ${router?.query?.token}` : "";
        let userInfo = await fetchUserInfo(token);
        if (userInfo?.EthAddress && !userInfo?.Invite?.Code) router.push("/invite");

        if (userInfo?.EthAddress && userInfo?.Invite?.Code) router.push("/earn");

        if (!userInfo?.EthAddress && !userInfo?.Invite?.Code) router.push("/login");
      }
    })();
  }, [router?.query?.token]);

  return <div className="flex flex-row items-center w-full h-full gap-8 px-20 "></div>;
};

export default Authenticate;
