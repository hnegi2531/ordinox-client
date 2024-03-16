import React from "react";
import Button from "./Button";

type AuthenticateProps = {
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const Authenticate: React.FC<AuthenticateProps> = ({ setScreenNumber }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
     

      <a 
      href="http://straddle.abstractly.in:7890/auth/twitter" 
      // onClick={() => setScreenNumber((prev) => prev + 1)}
      >twitter</a>

      <button
      onClick={() => setScreenNumber((prev) => prev + 1)}
      >twitterrr</button>
    </div>
  );
};

export default Authenticate;
