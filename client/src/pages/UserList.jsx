import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //Backend API endpoint
    fetch("http://localhost:3001/api/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log("Current users state:", users);

  return (
    <div className=" bg-orange-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 p-10 pb-0">
        <span className="relative inline-block pb-1">
          Voters List :-
          <span className="absolute bottom-0 left-1/2 w-3/4 h-1 bg-orange-500 transform -translate-x-1/2"></span>
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user._id} data={user} type="user" />
        ))}
      </div>
    </div>
  );
}

export default UserList;
