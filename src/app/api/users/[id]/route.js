import { connectDB } from "@/lib/mongodb";
import { User } from "@/model/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";

// تعريف مخطط البيانات باستخدام Zod
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
});

// GET - Fetch User by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
  }
}

// PUT - Update User
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    // التحقق من صحة البيانات
    const parsedBody = userSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ message: "Invalid data", errors: parsedBody.error.errors }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}

// DELETE - Remove User
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
