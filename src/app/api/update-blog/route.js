import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import Joi from "joi";

const EditBlog = Joi.object({
  title : Joi.string().required(),
  description : Joi.string().required(),
})

export async function PUT(req){
  try{
    await connectToDB()
    const {searchParams} = new URL(req.url)
    const getCurrentBlogId = searchParams.get('id')
    if(!getCurrentBlogId){
      return NextResponse.json({
        success : false,
        message : "Blog Id is required"
      })
    }

    const {title, description} = await req.json()

    const {error} = EditBlog.validate({
      title, description
    })
    if(error){
      return NextResponse.json({
        success : false ,
        message : error.details[0].message
      })
    }

    const updateBlogById = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogId,
      },
      { title, description },
      { new: true }
    );
    if(updateBlogById){
      return NextResponse.json({
        success : true,
        message : "Blog is updated successfully"
      })
    }else{
      return NextResponse.json({
        success : false,
        massage: "somethis going wrong! try again later"
      })
    }

  }catch(err){
    console.log(err);
    return NextResponse.json({
      success : false,
      massage: "somethis going wrong! try again "
    })
    
  }
}