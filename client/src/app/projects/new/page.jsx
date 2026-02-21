"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      alert("Error creating project");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Create Project</h1>

        <label className="block mb-2">Project Name</label>
        <input
          name="name"
          required
          className="w-full border p-2 rounded mb-4"
          value={form.name}
          onChange={handleChange}
        />

        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          className="w-full border p-2 rounded mb-6"
          value={form.description}
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Create
        </button>
      </form>
    </div>
  );
}