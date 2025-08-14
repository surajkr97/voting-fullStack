import React from "react";
import { GiVote } from "react-icons/gi";

const Card = ({ data, type, onVote }) => {
  if (!data) {
    return null;
  }

  // Common styles for the card
  const cardStyles =
    "bg-white rounded-2xl shadow-xl overflow-hidden text-center transition-transform duration-300 hover:scale-105";
  const nameStyles = "text-3xl font-bold text-center mb-4";
  const detailStyles = "text-gray-700 text-md";
  const labelStyles =
    "inline-block px-3 py-1 text-sm font-semibold rounded-full";

  // Conditional rendering based on the type of data
  if (type === "candidate") {
    return (
      <div className={cardStyles}>
        <div className="p-8">
          <h3 className={nameStyles}>{data.name}</h3>
          <p className={detailStyles}>{data.party}</p>
          <span
            className={`${labelStyles} mt-4 bg-orange-100 text-orange-700 border border-orange-300`}
          >
            Votes: {data.voteCount}
          </span>
        </div>
        <div className="bg-orange-50 border-t border-orange-100 p-4">
          <button
            onClick={() => onVote(data._id)} // Pass the candidate's ID to the onVote function
            className="inline-flex items-center w-full justify-center bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
          >
            <span className="mr-2">Vote</span>
            <GiVote className="h-6 w-6" />
          </button>
        </div>
      </div>
    );
  } else if (type === "user") {
    return (
      <div className={cardStyles}>
        <div className="p-8">
          <h3 className={`${nameStyles} text-orange-700 mb-6`}>{data.name}</h3>
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Username:</span>
            <span className="text-right">{data.userName}</span>
          </p>
          <hr className="my-4 border-orange-200" />
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-right">{data.email}</span>
          </p>
          <hr className="my-4 border-orange-200" />
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Address:</span>
            <span className="text-right">{data.address}</span>
          </p>
        </div>
      </div>
    );
  }

  // Fallback for an unknown type
  return (
    <div className={cardStyles}>
      <div className="p-8">
        <h3 className={nameStyles}>Unknown Data Type</h3>
      </div>{" "}
    </div>
  );
};

export default Card;
