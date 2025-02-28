"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ErrorPage from "@/app/error"; // Make sure this exists
import NotFoundPage from "@/app/not-found"; // Make sure this exists

export default function UserDetail() {
  const { id } = useParams(); 
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return; // Prevent running fetch if id is undefined

    setLoading(true);
    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Handle delete user
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user?.name || "this user"}?`
    );
    
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete user");

      alert("User deleted successfully!");
      router.push("/users"); // Redirect after deletion
    } catch (error) {
      alert("Error deleting user!");
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;
  if (!user) return <NotFoundPage />;

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Details</h1>
        <div className="text-gray-600 text-lg p-6 border rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Phone: {user.phone}</p>
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => router.push("/users")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Users List
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
