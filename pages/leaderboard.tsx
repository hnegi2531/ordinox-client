import { leaderboardData } from "@/utils/dummyData";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="px-20 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl text-brand-300">leaderboard</h1>
        <p className="text-sm">deposit funds and invite your friends to earn more points</p>
      </div>
      <div className="relative w-full h-96 overflow-y-auto snap-y snap-mandatory" >
        <table className="w-full">
          <thead className="bg-indigo-400">
            <tr className="bg-black text-brand-200 uppercase text-center">
              <th className="sticky top-0">Id</th>
              <th className="sticky top-0">username</th>
              <th className="sticky top-0">invited by</th>
              <th className="sticky top-0">points earned</th>
            </tr>
          </thead>
            <tbody>
              {leaderboardData.map((data) => (
                <tr key={data.id} className="snap-center border-b-[1px] border-gray-300 text-center text-sm text-secondryText">
                  <td className="py-4 whitespace-nowrap">
                    {data.id}.
                  </td>
                  <td className="py-4 whitespace-nowrap">{data.username}</td>
                  <td className="py-4 whitespace-nowrap">
                    {data.invitedBy}
                  </td>
                  <td className="py-4 whitespace-nowrap">{data.pointesEarned}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
