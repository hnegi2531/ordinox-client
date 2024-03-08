import React from "react";

const Logo = ({ size = "base" }: { size?: "base" | "lg" }) => {
  return (
    <div className="flex items-center">
      <p
        className={`${
          size === "base" ? "text-base" : "text-3xl"
        } text-white select-none`}
      >
        ordinox
      </p>
    </div>
  );
};

export default Logo;