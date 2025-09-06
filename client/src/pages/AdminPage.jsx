import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState({ name: "", party: "", age: "" });

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
                navigate("/unauthorized"); // Redirect if not an admin
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
        if (!checkAdmin()) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/candidate/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCandidates(data);
            } else {
                toast.error("Failed to fetch candidates.");
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
            toast.error("Network error. Could not fetch data.");
        }
    };

    // Function to handle adding a new candidate
    const handleAddCandidate = async (e) => {
        e.preventDefault();
        if (!checkAdmin()) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3001/api/candidate/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newCandidate),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Candidate added successfully!");
                setNewCandidate({ name: "", party: "", age: "" }); // Reset form
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
        fetchCandidates();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                                <span>Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-10">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Candidates Management</h2>
                </header>

                {/* Add Candidate Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Candidate</h3>
                    <form onSubmit={handleAddCandidate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newCandidate.name}
                            onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                            className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Party"
                            value={newCandidate.party}
                            onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                            className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={newCandidate.age}
                            onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
                            className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                        <button
                            type="submit"
                            className="col-span-1 md:col-span-2 lg:col-span-3 bg-orange-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Add Candidate
                        </button>
                    </form>
                </div>

                {/* Candidates List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Candidates List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Party</th>
                                    <th className="py-3 px-6 text-left">Age</th>
                                    <th className="py-3 px-6 text-left">Vote Count</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {candidates.map((candidate) => (
                                    <tr key={candidate._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{candidate.name}</td>
                                        <td className="py-3 px-6 text-left">{candidate.party}</td>
                                        <td className="py-3 px-6 text-left">{candidate.age}</td>
                                        <td className="py-3 px-6 text-left">{candidate.voteCount}</td>
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