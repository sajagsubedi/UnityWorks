import Notice from "@/models/Notice.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import {
  CloudinaryUploadResult,
  dbQueryType,
  ImageType,
  Visibility,
} from "@/types/ApiTypes";
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

// Route 2: to update notice by ID
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

    //checking if the id is valid or not
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid notice ID" },
        { status: 400 }
      );
    }

    //fetch old notice with id
    const oldNotice = await Notice.findOne({ _id: id });
    if (!oldNotice) {
      return NextResponse.json(
        { success: false, message: "oldNotice not found" },
        { status: 404 }
      );
    }

    //formdata
    const formData = await request.formData();

    // Extract the title, description, image, and visibility from the form data
    const title = formData.get("title") as string;
    const visibility = formData.get("visibility") as Visibility;

    //change the value of old notice
    if (title) {
      oldNotice.title = title;
    }

    if (visibility) {
      oldNotice.visibility = visibility;
    }
    // upload image to cloudinary
    const files = formData.getAll("images") as File[] | null;

    //condition if user is sending file
    if (files && files.length !== 0) {
      const uploadPromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<ImageType>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "Notice" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve({
                  url: result?.secure_url,
                  public_id: result?.public_id,
                } as ImageType);
              }
            }
          );
          uploadStream.end(buffer);
        });
      });

      // Wait for all uploads to complete
      const imageUrls = await Promise.all(uploadPromises);

      //delete images from cloudinary
      oldNotice.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      });
      
      oldNotice.images = imageUrls;
    }

    //save the notice
    await oldNotice.save();

    return NextResponse.json(
      {
        success: true,
        notice: oldNotice,
        message: "Notice updated successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
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
