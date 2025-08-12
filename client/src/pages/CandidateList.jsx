import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom';

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage

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
            "Authorization": `Bearer ${token}` // This is the key change!
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch candidates. Please log in again.");
        }

        const data = await response.json();
        setCandidates(data.candidates); // Ensure you're setting the correct data property
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError(err.message);
        // You might want to clear the token and redirect on an error
        localStorage.removeItem('token');
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate]); // Added navigate to the dependency array

  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Candidates:</h2>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card key={candidate._id} data={candidate} type="candidate" />
        ))}
      </div>
    </div>
  );
}

export default CandidatesList;