import React from "react";

const tierData = [
  {id: 1, tier: "crawler", friendsInvited: "1-6", points: "150 + 6% points" },
  {id: 2, tier: "walker", friendsInvited: "6-10", points: "300 + 8% points" },
  {id: 3, tier: "runner", friendsInvited: "11-20", points: "600 + 11% points" }
]

const Profile = () => {
  return (
    <div className="h-full w-full flex flex-row items-center px-20">
      <div className="flex-1 flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-brand-300">origins hq</h1>
          <p className="text-sm">deposit funds and invite your friends to earn more points</p>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-brand-300 uppercase">points earned</h4>
            <p className="text-3xl text-brand-300">910,130</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm text-brand-300 uppercase">leaderboard rank</h4>
            <p className="text-3xl text-brand-300">134</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-brand-300 uppercase">your balance</h1>
          <p className="text-3xl text-brand-300 uppercase">$0.00</p>
        </div>
        <div>
          <span>generate code</span>
          <div></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-8 w-full">
          <h1 className="text-sm text-brand-300">your tier</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center mb-5 text-xs text-brand-300 uppercase">
              <span className="flex-1">tier</span>
              <span className="flex-1">friends invited</span>
              <span className="flex-1">points</span>
            </div>
            {tierData?.map((data) => (
                <div className="flex items-center text-xs mb-5">
                  <span className="flex-1">{data.tier}</span>
                  <span className="flex-1">{data.friendsInvited}</span>
                  <span className="flex-1">{data.points}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-brand-300 uppercase">mystery box</span>
          <span className="uppercase">open</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
