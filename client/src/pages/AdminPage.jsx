import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    party: "",
    age: "",
  });

  // Function to check if the user is an admin
  const checkAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "admin") {
        navigate("/unauthorized");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
      return false;
    }
  };

  // Function to fetch all candidates from the backend
  const fetchCandidates = async () => {
    // Perform admin check before making the API call
    if (!checkAdmin()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/candidate/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for a successful response (status code 200-299)
      if (!response.ok) {
        // If the response is not OK, handle the error gracefully
        let errorMsg = `Server responded with status: ${response.status}`;

        // Try to parse the error message if it's JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        }

        throw new Error(errorMsg);
      }

      // If the response is OK, safely parse it as JSON
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast.error(error.message || "Network error. Could not fetch data.");
    }
  };

  // Function to handle adding a new candidate
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!checkAdmin()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/candidate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCandidate),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Candidate added successfully!");
        setNewCandidate({ name: "", party: "", age: "" });
        fetchCandidates(); // Refresh the list
      } else {
        toast.error(data.error || "Failed to add candidate.");
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast.error("Network error. Could not add candidate.");
    }
  };

  useEffect(() => {
    if (checkAdmin()) {
      fetchCandidates();
    }
  }, []);

  const handleDelete = async (id) => {
    if (!checkAdmin()) return;

    if (!window.confirm("Are you sure you want to delete this candidate?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/candidate/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Candidate deleted successfully!");
        setCandidates(candidates.filter((candidate) => candidate._id !== id));
      } else {
        toast.error(data.error || "Failed to delete candidate.");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Network error. Could not delete candidate.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:h-auto bg-gradient-to-tl from-gray-800 to-orange-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 md:mb-8 text-center md:text-left">
          Admin Panel
        </h1>
        <nav>
          <ul className="flex md:flex-col justify-center md:justify-start space-x-6 md:space-x-0">
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-10">
        <header className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            Candidates Management
          </h2>
        </header>

        {/* Add Candidate Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Add New Candidate
          </h3>
          <form
            onSubmit={handleAddCandidate}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, name: e.target.value })
              }
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="text"
              placeholder="Party"
              value={newCandidate.party}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, party: e.target.value })
              }
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={newCandidate.age}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, age: e.target.value })
              }
              className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 lg:col-span-3 bg-orange-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-800 transition duration-300"
            >
              Add Candidate
            </button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-4">
            Candidates List
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-xs md:text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Party</th>
                  <th className="py-3 px-4 text-left">Age</th>
                  <th className="py-3 px-4 text-left">Vote Count</th>
                  <th className="py-3 px-4 text-left">Delete</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 font-light">
                {candidates.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{candidate.name}</td>
                    <td className="py-3 px-4">{candidate.party}</td>
                    <td className="py-3 px-4">{candidate.age}</td>
                    <td className="py-3 px-4">{candidate.voteCount}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => handleDelete(candidate._id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
