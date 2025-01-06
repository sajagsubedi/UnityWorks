import News, { Visibility } from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Route 1: to fetch news by ID
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDb();
  try {
    const { id } = await params;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid news ID" },
        { status: 400 }
      );
    }
    const news = await News.findOne({
      _id: id,
      visibility: Visibility.PUBLIC,
    });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, news }, { status: 200 });
  } catch (err) {
    console.error("Error fetching news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

// Route 2: to update news by ID
export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDb();
  try {
    const { id } = await params;
    const { title, content, visibility } = await request.json();

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid news ID" },
        { status: 400 }
      );
    }

    const news = await News.findOneAndUpdate(
      { _id: id },
      { title, content, visibility },
      { new: true }
    );

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, news, message: "News updated successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

// Route 3: to delete news by ID
export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  await connectDb();
  try {
    const { id } = await params;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid news ID" },
        { status: 400 }
      );
    }

    const news = await News.findOneAndDelete({ _id: id });

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "News deleted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
