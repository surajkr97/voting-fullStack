import React from "react";

const Card = ({ data, type }) => {
  if (!data) {
    return null;
  }

  // Common styles for the card
  const cardStyles = "bg-white shadow rounded-2xl overflow-hidden text-center p-6 border-2 border-gray-200";
  const nameStyles = "mt-4 text-lg font-semibold text-gray-800";
  const detailStyles = "text-gray-500 text-sm";
  const labelStyles = "inline-block mt-3 px-3 py-1 text-sm rounded-full";

  // Conditional rendering based on the type of data
  if (type === "candidate") {
    return (
      <div className={cardStyles}>
        <h3 className={nameStyles}>{data.name}</h3>
        <p className={detailStyles}>{data.party}</p>
        <span className={`${labelStyles} bg-green-100 text-green-700`}>
          Votes: {data.voteCount}
        </span>
      </div>
    );
  } else if (type === "user") {
    return (
      <div className={cardStyles}>
        <h3 className={nameStyles}>{data.name}</h3>
        <p className={detailStyles}>Email: {data.email}</p>
        <p className={detailStyles}>Mobile: {data.mobile}</p>
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