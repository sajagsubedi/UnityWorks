import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "#unityworks123#";

export const GET = async () => {
  try {
    // Extract token from cookies
    const token = cookies().get("Authorization")?.value;

    // Check if token is missing
    if (!token) {
      return NextResponse.json(
        { success: false, isAuthenticated: false, message: "Token missing" },
        { status: 401 }
      );
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET) as JwtPayload & {
        _id: string;
      };
      
      return NextResponse.json(
        {
          success: true,
          isAuthenticated: true,
          user: { id: decoded._id },
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, isAuthenticated: false, message: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
};
