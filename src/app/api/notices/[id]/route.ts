import Notice, { Visibility } from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Route 1: to fetch notice by ID
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDb();
  try {
    const { id } = await params;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid notice ID" },
        { status: 400 }
      );
    }
    const notices = await Notice.findOne({
      _id: id,
      visibility: Visibility.PUBLIC,
    });

    if (!notices) {
      return NextResponse.json(
        { success: false, message: "Notices not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, notices }, { status: 200 });
  } catch (err) {
    console.error("Error fetching news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
