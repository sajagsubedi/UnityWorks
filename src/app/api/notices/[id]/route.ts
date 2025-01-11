import Notice from "@/models/Notice.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import { dbQueryType, Visibility } from "@/types/ApiTypes";

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
      dbQuery["visibility"] = Visibility.PUBLIC; // Fetch public news only if not authenticated
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
    console.error("Error fetching news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
