"use client";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    // console.log('clicked');
    event.preventDefault();
    setError("");

    try {
      const respond = await fetch("http://localhost:3005/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password}),
      })

      const data = await respond.json();

      if (respond.ok) {
        console.log("Login successful:", data);
        // localStorage.setItem("userId", data.userId);
        // localStorage.setItem("username", data.username);
        router.push(`/profile/${data.userId}`);
      } else {
        setError(data.message || "Login failed");
      }
      
    } catch (error) {
       console.error(error);
       setError("Something went wrong");
    }
    
  } 

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
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Username/Email"
          inputMode="email"
          className="bg-white/20 p-3 rounded-md"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="bg-white/20 p-3 rounded-md w-full pr-10"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        No account?{" "}
        <a href="/register" className="text-yellow-100 underline">Register here</a>
      </p>
    </div>
  );
}
