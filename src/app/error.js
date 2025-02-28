"use client"; // Required for error components

import { useEffect } from "react";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800">
      <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-2 text-lg">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()} // Try reloading the page
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
