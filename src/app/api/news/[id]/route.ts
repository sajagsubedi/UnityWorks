import News from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import { CloudinaryUploadResult, dbQueryType, Visibility } from "@/types/ApiTypes";

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

    //checking if the id is valid or not
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return NextResponse.json(
        { success: false, message: "Invalid news ID" },
        { status: 400 }
      );
    }

    //fetch old news with id
    const oldNews = await News.findOne({ _id: id });
    if (!oldNews) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }
    
    //formdata
    const formData = await request.formData();

    // Extract the title, description, image, and visibility from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const visibility = formData.get("visibility") as Visibility;

    //change the value of old news
    if (title) {
      oldNews.title = title;
    }
    if (description) {
      oldNews.description = description;
    }
    if (visibility) {
      oldNews.visibility = visibility;
    }

    //extract file from formdata
    const file = formData.get("image") as File | null;

    //upload file to cloudinary if exists
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "news",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as CloudinaryUploadResult);
              }
            }
          );

          uploadStream.end(buffer);
        }
      );

      //delete old image
      await cloudinary.uploader.destroy(oldNews.image.public_id);

      //update the newValues object with the uploaded image url
      oldNews.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    //save the news
    await oldNews.save();

    return NextResponse.json(
      { success: true, news: oldNews, message: "News updated successfully!" },
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
