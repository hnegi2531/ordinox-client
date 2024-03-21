import { leaderboardData } from "@/utils/dummyData";
import React from "react";

const Leaderboard = () => {
  return (
    <>
      <div className="flex flex-col h-full gap-8 px-20 relative">
        <div className="flex flex-col h-full gap-2">
          <h1 className="text-4xl text-brand-300">leaderboard</h1>
          <p className="text-lg">deposit funds and invite your friends to earn more points</p>
        </div>
        <div className="">
          <div className="min-w-full divide-y divide-gray-400">
            <div className="bg-black">
              <div className="grid grid-cols-4 text-brand-400">
                <div className="py-6 font-semibold uppercase">Rank</div>
                <div className="py-6 font-semibold uppercase">username</div>
                <div className="py-6 font-semibold uppercase">invited by</div>
                <div className="py-6 font-semibold uppercase">points earned</div>
              </div>
            </div>

            <div className="h-[630px] overflow-auto flex flex-col divide-y divide-gray-700 ">
              {leaderboardData?.map((data, index) => {
                const isFirst = index === 0;
                return (
                  <div key={data.id} className={`flex flex-1 ${isFirst && "bg-purple-700"}`}>
                    <div className="flex-1 py-6">
                      <span className="pl-4">{data.id}.</span>
                    </div>
                    <div className="flex-1 py-6">{data.username}</div>
                    <div className="flex-1 py-6">{data.invitedBy}</div>
                    <div className="flex-1 py-6">{data.pointesEarned}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="fixed h-full w-full left-0 right-0 bg-black bg-opacity-30 backdrop-blur-sm text-white flex justify-center items-center overflow-hidden">
          Coming Soon!
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
