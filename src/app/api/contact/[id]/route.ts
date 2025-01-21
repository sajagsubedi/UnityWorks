import connectDb from "@/lib/connectDb";
import ContactModels from "@/models/Contact.models";
import { NextResponse } from "next/server";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import mongoose from "mongoose";

//Route 1:to update the viewed contact submission as read
export const PATCH = async (
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

    //checking auth
    const auth = await checkAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const updatedForm = await ContactModels.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!updatedForm) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact submission not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact submission set as read successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating contact forms:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
