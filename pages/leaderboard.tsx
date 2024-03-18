import { leaderboardData } from "@/utils/dummyData";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="px-20 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-brand-300">leaderboard</h1>
        <p className="text-sm">deposit funds and invite your friends to earn more points</p>
      </div>
      <div className="h-[400px] overflow-y-auto snap-y snap-mandatory">
        <div className="min-w-full">
          <div className="sticky top-0 bg-black z-10">
            <div className="grid grid-cols-4">
              <div className="font-semibold py-4 uppercase">Id</div>
              <div className="font-semibold py-4 uppercase">username</div>
              <div className="font-semibold py-4 uppercase">invited by</div>
              <div className="font-semibold py-4 uppercase">points earned</div>
            </div>
          </div>

          <div className="grid grid-cols-4 divide-x-0 divide-white">
            {leaderboardData?.map((data) => {
              return (
                <React.Fragment key={data.id}>
                  <div className=" py-4 border-gray-300">{data.id}</div>
                  <div className=" py-4 border-gray-300">{data.username}</div>
                  <div className=" py-4 border-gray-300">{data.invitedBy}</div>
                  <div className=" py-4 border-gray-300">{data.pointesEarned}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
