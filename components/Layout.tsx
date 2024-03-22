import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AnimatePresence, motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const ordinoxBackground = useMemo(() => {
    if (router?.pathname === "/") {
      return "bg-paper";
    }

    if (router?.pathname === "/leaderboard") {
      return "bg-black";
    }

    if (router?.pathname === "/score") {
      return "bg-ordinoxScore";
    }

    return "bg-ordinox";
  }, [router?.pathname]);

  const ordinoxGradient = useMemo(() => {
    if (router?.pathname === "/") {
      return "bg-gradient-radial";
    }

    if (router?.pathname === "/leaderboard") {
      return "";
    }

    if (router?.pathname === "/score") {
      return "";
    }

    return "";
  }, [router?.pathname]);

  return (
    <article className="relative flex flex-col items-center w-screen h-screen overflow-auto bg-black font-spacemono text-secondryText">
      <div
        className={`flex flex-col items-center w-full h-full min-h-screen bg-cover ${ordinoxBackground}`}>
        <div className="z-20 flex flex-col w-full h-full">
          <header>
            <Navbar />
          </header>
          <section className={`h-full w-full`}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="w-full h-full">
                {children}
              </motion.div>
            </AnimatePresence>
          </section>
          <div className="items-center justify-center hidden mb-10 lg:flex">
            {router.pathname !== "/leaderboard" && <Footer />}
          </div>
        </div>
        {/* <div className={`absolute inset-0  ${ordinoxGradient} `} /> */}
      </div>
    </article>
  );
};

export default Layout;
