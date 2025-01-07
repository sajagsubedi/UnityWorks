import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "@/models/Admin.models";
import connectDb from "@/lib/connectDb";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "#unityworks123#";

export const checkAuth = async () => {
  await connectDb();
  try {
    // Extract token from cookies
    const token = cookies().get("Authorization")?.value;

    // Check if token is missing
    if (!token) {
      return {
        success: false,
        isAuthenticated: false,
        message: "Unauthorized",
      };
    }

    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtPayload & {
      _id: string;
    };

    const AdminUser = await Admin.findById(decoded._id);

    if (!AdminUser) {
      return {
        success: false,
        isAuthenticated: false,
        message: "Unauthorized",
      };
    }

    return {
      success: true,
      isAuthenticated: true,
      user: { id: decoded._id },
    };
  } catch (err) {
    console.log("Verification Error:", err);
    return {
      success: false,
      isAuthenticated: false,
      message: "Unauthorized",
    };
  }
};
