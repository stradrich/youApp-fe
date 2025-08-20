"use client";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";
export default function RegisterPage() {
const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(
        { email: "", 
          username: "", 
          password: "", 
          confirmPassword: "" 
        }
  );
  const router = useRouter();

  const handleSubmit = async (event) => {
  event.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:3005/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      }),
    });

    if (!res.ok) throw new Error("Failed to register");
    const data = await res.json();
    console.log("Registration successful:", data);
    // redirect or show success message
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
};
  
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email"
          inputMode="email"
          className="bg-white/20 p-3 rounded-md"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <input
          type="text"
          placeholder="Create Username"
          inputMode="text"
          className="bg-white/20 p-3 rounded-md"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            className="bg-white/20 p-3 rounded-md w-full pr-10"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="bg-white/20 p-3 rounded-md w-full pr-10"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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
