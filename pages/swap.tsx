import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { FaDiscord } from "react-icons/fa";

const swap = () => {
  return (
    <>
      <main className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-between h-full max-w-6xl gap-8 mb-20 text-center md:justify-center">
          <div className="relative h-28 w-80 text-center">
            <Image src={"/whitelist.png"} alt="whitelist" fill />
          </div>

          <div>
            <h1 className="text-5xl text-center text-brand-300">
              learn how you can be whitelisted by joining our discord
            </h1>
          </div>

          <div className="max-w-lg">
            <p className="font-light">our team members are helpful and don’t bite.</p>
          </div>

          <div>
            <Button
              variant="primary"
              className="flex items-center w-full gap-4 px-20 text-lg font-semibold uppercase font-poppins bg-discordbtn text-white hover:bg-indigo-500 border-indigo-200 hover:border-indigo-300 active:border-indigo-200"
              onClick={() => window.open("https://discord.gg/PG8w4RG5jJ", "_blank")}
            >
              <span>Join Discord</span>
              <span className="flex items-center justify-center">
                <FaDiscord className="text-2xl" />
              </span>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default swap;
