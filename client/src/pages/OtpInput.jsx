// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const OtpInput = () => {
//   const [otp, setOtp] = useState(new Array(4).fill(""));
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false;

//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//     // Focus on the next input field
//     if (element.nextSibling) {
//       element.nextSibling.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     // Handle backspace
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 4) {
//       toast.error("Please enter a valid 4-digit OTP.");
//       return;
//     }
    
//     // Here you would typically send the OTP to your backend for verification
//     // For this example, we'll simulate a successful verification
//     console.log("OTP Submitted: ", enteredOtp);
//     toast.success("OTP verified successfully!");
//     navigate("/dashboard"); // Redirect to a new page
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Enter OTP
//         </h2>
//         <p className="text-gray-600 mb-6">
//           A 4-digit code has been sent to your email.
//         </p>
//         <form onSubmit={handleVerifyOtp}>
//           <div className="flex justify-center gap-4 mb-6">
//             {otp.map((data, index) => {
//               return (
//                 <input
//                   key={index}
//                   type="text"
//                   name="otp"
//                   maxLength="1"
//                   className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
//                   value={data}
//                   onChange={(e) => handleChange(e.target, index)}
//                   onFocus={(e) => e.target.select()}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                 />
//               );
//             })}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//           >
//             Verify OTP
//           </button>
//         </form>
//         <p className="mt-4 text-gray-500 text-sm">
//           Didn't receive the OTP?{" "}
//           <button className="text-blue-600 hover:underline focus:outline-none">
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OtpInput;