import connectDb from "@/lib/connectDb";
import ContactModels from "@/models/Contact.models";
import { NextResponse } from "next/server";

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
