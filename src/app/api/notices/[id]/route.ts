import Notice from "@/models/Notice.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import { dbQueryType, Visibility } from "@/types/ApiTypes";
import cloudinary from "@/lib/cloudinary";

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
    const dbQuery: dbQueryType = {
      _id: id,
    };

    const auth = await checkAuth(); //checking auth
    if (!auth || !auth.isAuthenticated) {
      dbQuery["visibility"] = Visibility.PUBLIC; // Fetch public notice only if not authenticated
    }
    const notice = await Notice.findOne(dbQuery);

    if (!notice) {
      return NextResponse.json(
        { success: false, message: "Notices not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, notice }, { status: 200 });
  } catch (err) {
    console.error("Error fetching notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

//Route 2:to update notice
export const PATCH = async (request: Request) => {
  return NextResponse.json(
    { success: true, message: "Notice updated successfully!" },
    { status: 200 }
  );
};

// Route 3 : to delete notice by ID
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
        { success: false, message: "Invalid notice ID" },
        { status: 400 }
      );
    }

    const notice = await Notice.findOneAndDelete({ _id: id });

    if (!notice) {
      return NextResponse.json(
        { success: false, message: "Notice not found" },
        { status: 404 }
      );
    }

    //delete image from cloudinary
    notice.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    });

    return NextResponse.json(
      { success: true, message: "Notice deleted successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
