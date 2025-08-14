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
      const response = await fetch(`http://localhost:3001/api/user/${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    <div className="flex flex-col">
      <div className="flex justify-center items-center text-2xl bg-orange-50 p-20 min-h-[53vh]">
        Name: {user.name} <br />
        Email: {user.email} <br />
        IsVoted: {user.isVoted ? 'Yes' : 'No'} <br />
        From: {user.address}
      </div>
    </div>
  );
};

export default Profile;
