"use client";

import { useState } from "react";
import { z } from "zod";

// Define Zod schema for validation
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
});

export default function NewUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset previous messages

    // Validate form using Zod
    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const errorMessages = result.error.format();
      setErrors(errorMessages);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("✅ User added successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } else {
      setMessage("❌ Failed to add user.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Add a New User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email._errors[0]}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 placeholder-gray-400"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone._errors[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            ➕ Add User
          </button>
        </form>
        
        {message && (
          <p className={`mt-5 text-center text-lg font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
