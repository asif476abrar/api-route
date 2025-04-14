import connectToDB from "@/database"
import Blog from "@/models/blog";
import { NextResponse } from "next/server"



export async function DELETE(req){
  try{
    await connectToDB();
    const {searchParams} = new URL(req.url)
    const getCurrentBlogId= searchParams.get('id')
    if(!getCurrentBlogId){
      return NextResponse({
        success: false,
        massage: "something is wrong here! try again later."
      })
    }
    const deleteCurrentBlogData = await Blog.findByIdAndDelete(getCurrentBlogId)
    if(deleteCurrentBlogData){
      return NextResponse.json({
        success :true,
        massage :"Blog deleted successfully"
      }) 
    } return NextResponse.json({
      success  : false ,
      massage : "something is wrong here! try again later."
    })
  }catch(error){
    console.log(error)
    return NextResponse.json({
      success  : false ,
      massage : "something is wrong here! try again later."
    })
  }
}