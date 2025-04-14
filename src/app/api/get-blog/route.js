import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
  try{
    await connectToDB();
    const extractAllDataFromDatabase = await Blog.find({})
     if(extractAllDataFromDatabase){
      return NextResponse.json({
        success : true,
        data : extractAllDataFromDatabase,
      })
     }else{
      return NextResponse.json({
        success : false,
        message : "Something wrong here! please try again later.", 
      })
     }
  }catch(err){
    console.log(err);
    return NextResponse.json({
      success : false,
      message : "Something wrong here! please try again later.",
    })

  }
} 