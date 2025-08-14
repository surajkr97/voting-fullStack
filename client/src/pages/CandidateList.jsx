import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    const token = localStorage.getItem("token"); // Retrieve the JWT from localStorage

    if (!token) {
      // If no token is found, redirect to the login page
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/candidate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch candidates. Please log in again.");
      }

      const data = await response.json();
      setCandidates(data); // Ensure you're setting the correct data property
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(err.message);
      // You might want to clear the token and redirect on an error
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // This is the vote submission function
  const handleVote = async (candidateId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/candidate/vote/${candidateId}`, {
        // Your vote endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ candidateId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit vote.");
      }

      alert("Vote submitted successfully!");

      // Refresh the candidate list to show the updated vote count
      fetchCandidates();

    } catch (err) {
      alert(err.message);
      console.error("Error submitting vote:", err);
    }
  };

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl flex justify-center items-center p-10 pb-0"><span className="rounded-full border-2 border-orange-700 px-5 py-3">Candidates List to Vote :-</span></h2>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card
            key={candidate._id}
            data={candidate}
            type="candidate"
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
}

export default CandidatesList;
