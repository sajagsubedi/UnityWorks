import News, { Visibility } from "@/models/News.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/middlewares/checkAuth.middleware";

interface dbQueryType {
  _id?: string;
  visibility?: Visibility;
}

// Define the Cloudinary upload result interface
interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

// Route 1: to fetch news with pagination
export const GET = async (request: Request) => {
  await connectDb();
  try {
    //checking auth
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 if not provided
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
    const pageType = searchParams.get("pagetype");

    // Pagination logic
    const skip = (page - 1) * limit;

    const dbQuery: dbQueryType = {};
    const auth = await checkAuth(); //checking auth

    if (!auth || !auth.isAuthenticated) {
      dbQuery["visibility"] = Visibility.PUBLIC; // Fetch public news only if not authenticated
    }

    //setting visibility public for authenticated users but accessing through landing page
    if (auth && auth.isAuthenticated) {
      if (pageType == "landing") {
        dbQuery["visibility"] = Visibility.PUBLIC; // Fetch public news only if auth user accessing through landing page
      }
    }

    // Fetch news from the database with pagination and sorting by date
    const news = await News.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { success: true, news, message: "News fetched successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

// Route 2: to add news to the database
export const POST = async (request: Request) => {
  await connectDb();
  try {
    const auth = await checkAuth(); //checking auth
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // upload image to cloudinary
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Please upload an image." },
        { status: 400 }
      );
    }

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

    // Extract the title, description, image, and visibility from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const visibility = formData.get("visibility") as Visibility;

    if (!title || !description || !visibility) {
      return NextResponse.json(
        { success: false, message: "Please provide all fields." },
        { status: 400 }
      );
    }

    // Create a new news object
    const news = new News({
      title,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      visibility,
    });

    // Save the news object to the database
    await news.save();

    return NextResponse.json(
      { success: true, news, message: "News added successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding news:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
