import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { toast } from "react-toastify";

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/candidate", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch candidates.");
      }

      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Submit vote (requires login)
  const handleVote = async (candidateId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first to vote.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/candidate/vote/${candidateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit vote.");
      }

      toast.success("Successfully Voted");
      fetchCandidates(); // Refresh after vote
    } catch (err) {
      toast.error(err.message);
      console.error("Vote error:", err);
    }
  };

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-orange-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 p-10 pb-0">
        <span className="relative inline-block pb-1">
          Candidates List to Vote :-
          <span className="absolute bottom-0 left-1/2 w-3/4 h-1 bg-orange-500 transform -translate-x-1/2"></span>
        </span>
      </h2>
      <br />
      <div className="grid grid-cols-1 gap-10 p-10 pt-5 md:grid-cols-2 lg:grid-cols-3">
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
