"use client";

import {useState} from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
   const router = useRouter(); 
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(form)
      });
       const data = await res.json();
      console.log("Login response:", res.status, data);

      if (res.ok) {
         router.push("/dashboard");
        setForm({ email: "", password: "" });
      } 
      else {
        setMessage(data.message || "Login failed");
      }

    } 
    catch (err) {
      console.error(err);
      setMessage("Server error. Check backend.");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        {message && (
          <p className="text-center text-sm mt-4">{message}</p>
        )}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "} 
          <Link href="/register" className="text-blue-600 cursor-pointer">Register</Link>
        </p>
      </div>
    </div>
  );
}