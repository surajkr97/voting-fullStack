import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const { userName } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/user/${userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user. The user may not exist.");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.message);
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userName]);

  if (loading) return <div>Loading your data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center bg-orange-50 p-10 md:p-20 lg:p-30">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm w-full p-8 transition-transform duration-300 hover:scale-105 transform">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">
          User Profile
        </h2>
        <div className="space-y-4">
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Name:</span>
            <span className="text-right">{user.name}</span>
          </p>
          <hr className="border-orange-100" />
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Email:</span>
            <span className="text-right">{user.email}</span>
          </p>
          <hr className="border-orange-100" />
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Has Voted:</span>
            <span
              className={`font-bold ${
                user.isVoted ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isVoted ? "Yes" : "No"}
            </span>
          </p>
          <hr className="border-orange-100" />
          <p className="flex justify-between items-center text-gray-600">
            <span className="font-semibold text-gray-800">Location:</span>
            <span className="text-right">{user.address}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
