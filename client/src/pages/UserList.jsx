import React, { useState, useEffect } from "react";
import Card from '../components/Card';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // The address of your backend API endpoint
    fetch("http://localhost:3001/api/user")
      .then((response) => response.json()) // Get the data and parse it as JSON
      .then((data) => setUsers(data)) // Save the data in state
      .catch((error) => console.error("Error:", error)); // Handle any errors
  }, []);

  console.log("Current users state:", users);

  return (
    <div>
      <h2>Users:</h2>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user._id} data={user} type="user" />
        ))}
        </div>
    </div>
  );
}

export default UserList;
