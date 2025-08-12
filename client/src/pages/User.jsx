import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const User = () => {
  const { userid } = useParams();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-center items-center text-2xl bg-orange-50 flex-1">
        User: {userid}
      </div>
      <Footer />
    </div>
  );
};

export default User;
