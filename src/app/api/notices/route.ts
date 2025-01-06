import Notice, { Visibility } from "@/models/Notice.model";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

// Route 1: to fetch Notices with pagination
export const GET = async (request: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const skip = (page - 1) * limit;

    const notices = await Notice.find({ visibility: Visibility.PUBLIC })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { success: true, notices, message: "Notices fetched successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching Notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
