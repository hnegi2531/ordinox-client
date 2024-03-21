import { useUserInfo } from "@/hooks/queries/useUser";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import Logo from "./Logo";
import NavRoute from "./NavRoute";

type NavLinkType = {
  id: number;
  text: string;
  route: string;
  isPrivateRoute: boolean;
};

const navLinks: NavLinkType[] = [
  { id: 1, text: "earn", route: "/profile", isPrivateRoute: true },
  { id: 2, text: "score", route: "/score", isPrivateRoute: true },
  { id: 3, text: "leaderboard", route: "/leaderboard", isPrivateRoute: false },
  { id: 4, text: "discord", route: "/discord", isPrivateRoute: false },
];

const Navbar = () => {
  const router = useRouter();

  const currentRoute = router.pathname;

  const { data: userInfo } = useUserInfo();

  const isUserLoggedIn = useMemo(() => {
    if (["/authenticate", "/", "/login", "/invite"].includes(router.pathname)) return false;
    return userInfo?.EthAddress && userInfo?.Invite?.Code ? true : false;
  }, [userInfo?.EthAddress, userInfo?.Invite?.Code]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <nav className="px-20 py-10">
      <div className="flex flex-row items-center justify-between bg-transparent">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <Logo size="lg" />
        </div>
        <div className="flex flex-row gap-12">
          {navLinks.map((link) => {
            const showLink = (link.isPrivateRoute && isUserLoggedIn) || !link.isPrivateRoute;
            const isActive = currentRoute === link.route;
            return (
              <NavRoute
                key={link.id}
                route={link.route}
                className={`text-base hover:text-brand-300 transition-all duration-100 pb-1 select-none ${
                  isActive ? "border-b text-brand-300 border-brand-300" : "text-white"
                } ${showLink ? "flex" : "hidden"}`}
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
