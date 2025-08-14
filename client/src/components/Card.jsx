import React from "react";
import { GiVote } from "react-icons/gi";

const Card = ({ data, type, onVote }) => {
  if (!data) {
    return null;
  }

  // Common styles for the card
  const cardStyles =
    "bg-orange-50 shadow rounded-2xl overflow-hidden text-center p-6 border-2 border-orange-400";
  const nameStyles = "text-lg font-semibold text-gray-800";
  const detailStyles = "text-gray-500 text-sm";
  const labelStyles = "inline-block mt-3 px-3 py-1 text-sm rounded-full";

  // Conditional rendering based on the type of data
  if (type === "candidate") {
    return (
      <div className={cardStyles}>
        <h3 className={nameStyles}>{data.name}</h3>
        <p className={detailStyles}>{data.party}</p>
        <span
          className={`${labelStyles} bg-green-100 text-green-700 border-1 border-green-700`}
        >
          Votes: {data.voteCount}
        </span>{" "}
        <br />
        <button
          onClick={() => onVote(data._id)} // Pass the candidate's ID to the onVote function
          className="inline-flex items-center mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          <span className="mr-2">Vote</span>
          <GiVote className="h-6 w-6" />
        </button>
      </div>
    );
  } else if (type === "user") {
    return (
      <div className={cardStyles}>
        <h3 className={nameStyles}>{data.name}</h3>
        <p className={detailStyles}>Email: {data.email}</p>
        <p className={detailStyles}>Username: {data.userName}</p>
        <p className={detailStyles}>Address: {data.address}</p>
      </div>
    );
  }

  // Fallback for an unknown type
  return (
    <div className={cardStyles}>
      <h3 className={nameStyles}>Unknown Data Type</h3>
    </div>
  );
};

export default Card;
