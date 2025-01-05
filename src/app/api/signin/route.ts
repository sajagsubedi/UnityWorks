import Admin from "@/models/Admin.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  await connectDb();
  try {
    const { email, password } = await request.json();

    // Validate input before DB query
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check for the user in the database
    const admin = await Admin.findOne({ email }).select("+password"); // Ensure password is selected explicitly if excluded by default
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate token and set it as a cookie
    const token = admin.generateToken();
    cookies().set("Authorization", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 3, // 3 hours
    });

    return NextResponse.json(
      { success: true, message: "Login successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
