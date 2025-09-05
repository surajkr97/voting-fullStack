import React, { useState } from "react";
import login from "../assets/Images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/Images/logo.png";
import { toast } from "react-toastify";

const LogIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email.trim() || !data.password.trim()) {
      setMessage("*Please Enter Your Details*");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // The body now sends an 'email' field
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        localStorage.setItem("token", token);

        // Decode the token to get the user's ID
        //Can be us to dynamic routes in future updates
        const decoded = jwtDecode(token);
        console.log("Decoded Token Payload:", decoded);
        // const userId = decoded.id;
        // navigate(`/${userId}`);

        toast.success("Successfully Signed Up");
        navigate(`/`);
      } else {
        setMessage(`*Invalid Login Credential*`);
        toast.error(`Error: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("*An unexpected error occurred. Please try again.*");
    }
  };

  return (
    <div className="md:h-screen flex flex-col">
      <header className="shadow sticky z-50 top-0 flex-none">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center cursor-pointer">
              <img src={logo} className="h-16" alt="Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to="#"
                className="hidden sm:block text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative flex flex-1 items-top justify-center min-h-110 sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto p-6">
          <p className="flex justify-center rounded-md p-2 text-xl text-red-500">
            {message}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-70 w-70 mt-3">
              <img src={login} alt="SignUp Img" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col justify-center"
            >
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="password" className="hidden">
                  Number
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-700 cursor-pointer hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
              >
                Log In
              </button>
              <p className="mt-2 text-gray-600">
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <span className="text-blue-600 underline cursor-pointer font-semibold">
                    Signup
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="w-[90vw] mx-auto pb-6 flex-none ">
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025 - Made with ♥️ by {" "}
            <a href="https://github.com/surajkr97" className="hover:underline">
              surajkr97
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
