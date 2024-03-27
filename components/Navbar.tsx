import { useUserInfo } from "@/hooks/queries/useUser";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import Logo, { GlitchLogo } from "./Logo";
import NavRoute from "./NavRoute";
import Account from "./Account";

type NavLinkType = {
  id: number;
  text: string;
  route: string;
  isPrivateRoute: boolean;
};

const navLinks: NavLinkType[] = [
  { id: 1, text: "earn", route: "/earn", isPrivateRoute: true },
  { id: 2, text: "score", route: "/score", isPrivateRoute: true },
  { id: 3, text: "leaderboard", route: "/leaderboard", isPrivateRoute: false },
  { id: 4, text: "discord", route: "https://discord.gg/PG8w4RG5jJ", isPrivateRoute: false },
];

const Navbar = () => {
  const router = useRouter();

  const currentRoute = router.pathname;

  const { data: userInfo } = useUserInfo();

  const isUserLoggedIn = useMemo(() => {
    if (["/authenticate", "/", "/login", "/invite"].includes(router.pathname)) return false;
    return userInfo?.EthAddress && userInfo?.Invite?.Code ? true : false;
  }, [userInfo?.EthAddress, userInfo?.Invite?.Code, router.pathname]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <nav className="px-4 pt-4 pb-10 lg:px-20 lg:py-10">
      <div className="flex flex-col justify-between gap-2 bg-transparent md:items-center md:flex-row">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          {/* <Logo size="lg" /> */}
          <GlitchLogo size='lg' />
        </div>
        <div className="flex flex-row flex-wrap gap-2 lg:gap-12">
          {navLinks.map((link) => {
            const showLink = (link.isPrivateRoute && isUserLoggedIn) || !link.isPrivateRoute;
            const isActive = currentRoute === link.route;
            return link.id === 4 ? (
              <a
                href={link.route}
                target="_blank"
                className={`uppercase text-base hover:text-brand-300 transition-all duration-100 pb-1 select-none ${isActive ? "border-b text-brand-300 border-brand-300" : "text-white"
                  } ${showLink ? "flex" : "hidden"}`}
              >
                {link.text}
              </a>
            ) : (
              <NavRoute
                key={link.id}
                route={link.route}
                className={`text-base hover:text-brand-300 transition-all duration-100 pb-1 select-none ${isActive ? "border-b text-brand-300 border-brand-300" : "text-white"
                  } ${showLink ? "flex" : "hidden"}`}
              >
                {link.text}
              </NavRoute>
            );
          })}
          {isUserLoggedIn && <Account />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
