import React from "react";
import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";
import bgImage from "../assets/Images/bg.png";

export default function Home() {
  return (
    <div
      className="relative w-full h-80 md:h-120 lg:h-191 flex"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="absolute right-1/24 md:right-1/6 top-1/4 md:top-1/3 lg:top-1/2 z-10">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
          🟢 Voting is Live
        </h2>
        <Link
          to="/candidates"
          className="inline-flex items-center mt-4 px-6 py-3 font-medium text-white bg-orange-700 rounded-lg float-right"
        >
          <span className="mr-2">Vote Now</span>
          <GiVote className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
