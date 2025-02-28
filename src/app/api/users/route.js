import { connectDB } from "@/lib/mongodb";
import { User } from "@/model/User";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectDB();
    const users = await User.find();
    return NextResponse.json(users.length > 0 ? users : [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users", users: [] }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    connectDB();
    const { name, email, phone } = await req.json();
    const newUser = new User({ name, email, phone });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
