import React, { useState, useEffect } from "react";
import Card from '../components/Card';

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // The address of your backend API endpoint
    fetch("http://localhost:3001/api/candidate")
      .then((response) => response.json()) // Get the data and parse it as JSON
      .then((data) => setCandidates(data)) // Save the data in state
      .catch((error) => console.error("Error:", error)); // Handle any errors
  }, []);

  return (
    <div>
      <h2>Candidates:</h2>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card key={candidate._id} candidate={candidate} />
        ))}
        </div>
    </div>
  );
}

export default CandidatesList;
