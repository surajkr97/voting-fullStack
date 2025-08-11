import React from "react";

const Card = (props) => {
  if (!props.candidate) {
    return null;
  }

  return (
      <div className="bg-red-100 shadow rounded-2xl overflow-hidden text-center p-6 border-2 border-blue-300">
        <h3 className="mt-4 text-lg font-semibold">
          {props.candidate?.username}
        </h3>
        <p className="text-gray-500 text-sm">{props.candidate?.party}</p>
        <span className="inline-block mt-3 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
          Votes: {props.candidate?.voteCount}
        </span>
      </div>
  );
};

export default Card;
