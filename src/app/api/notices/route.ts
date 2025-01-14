import Notice from "@/models/Notice.models";
import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkAuth } from "@/middlewares/checkAuth.middleware";
import { dbQueryType, Visibility, ImageType } from "@/types/ApiTypes";

// Route 1: to fetch Notices with pagination
export const GET = async (request: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageType = searchParams.get("pagetype");

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

    // Fetch total notices count
    const totalNotices = await Notice.countDocuments(dbQuery);

    const notices = await Notice.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        totalNotices,
        limit,
        page,
        notices,
        message: "Notices fetched successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching Notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};

// Route 2: to add Notice to the database
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
    const files = formData.getAll("images") as File[] | null;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please upload at least one image." },
        { status: 400 }
      );
    }

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

    // Extract the title, description, image, and visibility from the form data
    const title = formData.get("title") as string;
    const visibility = formData.get("visibility") as Visibility;

    if (!title || !visibility) {
      return NextResponse.json(
        { success: false, message: "Please provide all fields." },
        { status: 400 }
      );
    }

    // Create a new Notice object
    const notice = new Notice({
      title,
      images: imageUrls,
      visibility,
    });

    // Save the Notice object to the database
    await notice.save();

    return NextResponse.json(
      { success: true, notice, message: "Notice added successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding Notice:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
