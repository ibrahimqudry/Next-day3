"use client";

import ErrorPage from "@/app/error";
import Loading from "@/app/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define Zod schema
const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
});

export default function EditUser() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset, // Include reset to clear form after submission
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setValue("name", data.name);
                setValue("email", data.email);
                setValue("phone", data.phone);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [id, setValue]);
    
    const onSubmit = async (formData) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            reset(); // Reset form fields
            router.push("/users");
        } catch (error) {
            setError(true);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorPage />;

    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit User</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Name Input */}
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Name"
                        className="p-3 border rounded-lg text-black"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}

                    {/* Email Input */}
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className="p-3 border rounded-lg text-black"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    {/* Phone Input */}
                    <input
                        type="text"
                        {...register("phone")}
                        placeholder="Phone"
                        className="p-3 border rounded-lg text-black"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => router.push("/users")}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
