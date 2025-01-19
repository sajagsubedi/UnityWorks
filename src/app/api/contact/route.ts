import connectDb from "@/lib/connectDb";
import ContactModels from "@/models/Contact.models";
import { NextResponse } from "next/server";
import { checkAuth } from "@/middlewares/checkAuth.middleware";

//Route 1: to recieve contact forms from user
export const POST = async (request: Request) => {
  connectDb();
  try {
    const req = await request.json();
    const { name, email, subject, message } = req;

    if (
      [name, email, subject, message].some(
        (field) => field == null || field.trim() === ""
      )
    ) {
      return NextResponse.json(
        { message: "Please provide all the fields!", success: false },
        { status: 400 }
      );
    }

    const newForm = await ContactModels.create({
      name,
      email,
      subject,
      message,
    });

    console.log(newForm);
    return NextResponse.json(
      { message: "Contact information sent successfully!", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again later!",
      },
      { status: 500 }
    );
  }
};

//Route 2:to fetch contact forms in dashboard by admin with pagination
export const GET = async (request: Request) => {
  await connectDb();
  try {
    //checking auth
    const auth = await checkAuth();
    if (!auth || !auth.isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to 10 if not provided
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided

    // Pagination logic
    const skip = (page - 1) * limit;

    // Fetch total contact count
    const totalContactForms = await ContactModels.countDocuments();

    // Fetch contact forms from the database with pagination and sorting by date
    const contactForms = await ContactModels.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        totalContactForms,
        page,
        limit,
        contactForms,
        message: "Contact forms fetched successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching contact forms:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
};
