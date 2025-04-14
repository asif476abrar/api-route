import { NextResponse } from "next/server";
import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();

    const extractBlogData = await req.json();
    const { title, description } = extractBlogData; //extractBlogData is expected to be an object that contains properties like title and description.

    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const NewlyCreatedBlogItem = await Blog.create(extractBlogData); //.create(extractBlogData) inserts a new document into the blogs collection using the data from extractBlogData.
    if (NewlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! please try again",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong1 ! please try again",
    });
  }
}
