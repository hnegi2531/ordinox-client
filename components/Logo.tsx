import React from "react";

const Logo = ({ size = "base" }: { size?: "base" | "lg" }) => {
  return (
    <div className="flex items-center">
      <p
        className={`${
          size === "base" ? "text-base" : "text-2xl"
        } text-white select-none font-mplus2 font-bold`}
      >
        ordinox
      </p>
    </div>
  );
};

export default Logo;