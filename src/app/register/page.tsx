"use client";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div 
      className="max-w-[375px] mx-auto min-h-screen bg-black text-white flex flex-col justify-center p-6"
      style={{
        backgroundImage:
         'radial-gradient( circle farthest-corner at 10% 20%,  rgba(29,48,59,1) 56.2%, rgba(54,109,155,1) 90% )'
      }}
    >
      <div className="mb-18">
        <ArrowBackIosIcon/>
      </div>
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Email"
          inputMode="email"
          className="bg-white/20 p-3 rounded-md"
        />

        <input
          type="text"
          placeholder="Create Username"
          inputMode="text"
          className="bg-white/20 p-3 rounded-md"
        />

        <div className="relative">
          <input
            type="text"
            placeholder="Create Password"
            className="bg-white/20 p-3 rounded-md w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          >
            {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Confirm Password"
            className="bg-white/20 p-3 rounded-md w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          >
            {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 p-3 rounded-md"
          style={{
          backgroundImage:
            'radial-gradient(circle farthest-corner at 10% 20%, rgba(0,97,255,1) 0%, rgba(96,239,255,1) 100.7%)',
        }}
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Have an account?{" "}
        <a href="/" className="text-yellow-100 underline">Login here</a>
      </p>
    </div>
  );
}
