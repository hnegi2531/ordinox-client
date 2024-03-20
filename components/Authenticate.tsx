import React from "react";
import Button from "./Button";
import { baseURL } from "../apis/axios";

type AuthenticateProps = {
  setScreenNumber: (value: number | ((prevVar: number) => number)) => void;
};

const Authenticate: React.FC<AuthenticateProps> = ({ setScreenNumber }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">


      <a
        href={`${baseURL}/auth/twitter`}
      // onClick={() => setScreenNumber((prev) => prev + 1)}
      >twitter</a>

      <button
        onClick={() => setScreenNumber((prev) => prev + 1)}
      >twitterrr</button>
    </div>
  );
};

export default Authenticate;
