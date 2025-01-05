import News from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 if not provided
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided

    // Pagination logic
    const skip = (page - 1) * limit;

    // Fetch news from the database with pagination and sorting by date
    const news = await News.find().sort({ date: -1 }).skip(skip).limit(limit);

    return NextResponse.json({ success: true, news }, { status: 200 });
  } catch (err) {
    console.error("Error fetching news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
