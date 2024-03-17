import { fetchUserInfo, getUser } from "@/apis/users";
import { useUserInfo } from "@/hooks/queries/useUser";
// import { useUserInfo } from "@/hooks/queries/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Logo from "./Logo";
import NavRoute from "./NavRoute";
import Cookies from 'js-cookie';


type NavLinkType = {
  id: number;
  text: string;
  route: string;
  isPrivateRoute: boolean;
};

const navLinks: NavLinkType[] = [
  { id: 1, text: "score", route: "/score", isPrivateRoute: true },
  { id: 2, text: "leaderboard", route: "/leaderboard", isPrivateRoute: false },
  { id: 3, text: "discord", route: "/discord", isPrivateRoute: false },
  { id: 4, text: "profile", route: "/profile", isPrivateRoute: true },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    (async() => {
      if(router?.pathname === "/score") {
        const token = `Bearer ${Cookies.get("auth_token")}`
        const userInfo = await fetchUserInfo(token);
        console.log(userInfo)
        setIsUserLoggedIn((userInfo?.EthAddress && userInfo?.Invite?.Code) ? true : false);
        setActiveLink(1)
      };
    })()
  }, [router?.pathname])

  const handleLogoClick = useCallback(() => {
    setActiveLink(0);
    router.push("/");
  }, []);


  return (
    <nav className="px-20 py-10">
      <div className="flex flex-row justify-between items-center bg-transparent">
        <div onClick={handleLogoClick}>
          <Logo size="lg" />
        </div>
        <div className="flex flex-row gap-12">
          {navLinks.map((link) => {
            return (
              <NavRoute
                key={link.id}
                route={link.route}
                className={`text-xs transition-all duration-100 pb-1 select-none  ${activeLink === link.id ? "border-b border-secondryText" : ""} ${
                  link.isPrivateRoute ? (isUserLoggedIn ? "visible" : "invisible") : "visible"
                }`}
                onClick={() => setActiveLink(link.id)}
              >
                {link.text}
              </NavRoute>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
