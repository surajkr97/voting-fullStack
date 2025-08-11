import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const {userid} = useParams();
  return <div className="flex justify-center text-2xl p-45 bg-orange-50">User: {userid}</div>;
};

export default User;
