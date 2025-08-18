import React, { useState } from "react";
import signup from "../assets/Images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { toast } from "react-toastify";

const SignUp = () => {
  const userDetail = {
    userName: "",
    name: "",
    email: "",
    address: "",
    aadharCardNumber: "",
    password: "",
  };

  const [data, setdata] = useState(userDetail);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showOtpInput) {
      // Step 2: Handle OTP verification
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/verify-otp", // Corrected endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email, otp }),
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          toast.success("Account verified successfully!");
          navigate("/login"); // Redirect only after OTP verification is successful
        } else {
          toast.error(`Error: ${responseData.message}`);
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } else {
      // Step 1: Handle initial signup
      if (
        data.userName.trim().length < 3 ||
        data.name.trim().length < 3 ||
        data.password.trim().length < 3 ||
        data.email.trim().length < 3 ||
        data.address.trim().length < 3 ||
        data.aadharCardNumber.trim().length < 3
      ) {
        toast.error("All fields must be at least 3 characters long");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/user/signup", { // Corrected endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
          toast.success("Successfully Signed Up. Please check your email for the OTP.");
          setShowOtpInput(true); // Switch to the OTP input view
        } else {
          toast.error(`Error: ${responseData.error}`);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Keep styling consistent
  const inputField =
    "w-full mt-4 py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition duration-300";

  return (
    <div className="md:h-screen flex flex-col bg-gray-100">
      <header className="shadow sticky z-50 top-0 flex-none">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center cursor-pointer">
              <img src={logo} className="h-16" alt="Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="hidden sm:block text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-grow flex justify-center items-center p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white shadow-lg rounded-2xl overflow-hidden max-w-7xl w-full">
          {/* Image container for the first column */}
          <div className="hidden md:flex justify-center items-center p-6">
            <img src={signup} alt="SignUp" className="max-h-80" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 col-span-2 flex flex-col justify-center"
          >
            {!showOtpInput ? (
              // This is the initial signup form
              <>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                  Sign Up
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <input
                      onChange={handleInput}
                      type="text"
                      name="userName"
                      placeholder="Username"
                      className={inputField}
                      required
                    />
                    <input
                      onChange={handleInput}
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className={inputField}
                      required
                    />
                    <input
                      onChange={handleInput}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={inputField}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      onChange={handleInput}
                      type="text"
                      name="address"
                      placeholder="Address"
                      className={inputField}
                      required
                    />
                    <input
                      onChange={handleInput}
                      type="text"
                      name="aadharCardNumber"
                      placeholder="Aadhar Card Number"
                      className={inputField}
                      required
                    />
                    <input
                      onChange={handleInput}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className={inputField}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-700 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-orange-600 transition duration-300"
                >
                  Sign Up
                </button>
              </>
            ) : (
              // This is the OTP verification form
              <>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                  Enter Your OTP
                </h2>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={inputField}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-700 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-orange-600 transition duration-300"
                >
                  Verify OTP
                </button>
              </>
            )}

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 underline font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="w-[90vw] mx-auto pb-6 flex-none">
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025 - Made with ♥️ by{" "}
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

export default SignUp;