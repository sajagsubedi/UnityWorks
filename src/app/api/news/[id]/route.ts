import News, { Visibility } from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/middlewares/checkAuth.middleware";

interface dbQueryType {
  _id?: string;
  visibility?: Visibility;
}

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
    const dbQuery: dbQueryType = {
      _id: id,
    };

    const auth = await checkAuth(); //checking auth
    if (!auth || !auth.isAuthenticated) {
      dbQuery["visibility"] = Visibility.PUBLIC; // Fetch public news only if not authenticated
    }

    const news = await News.findOne(dbQuery);

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
    const auth = await checkAuth(); //checking auth
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
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
    const auth = await checkAuth(); //checking auth
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
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

    //delete image from cloudinary
    await cloudinary.uploader.destroy(news.image.public_id);

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
