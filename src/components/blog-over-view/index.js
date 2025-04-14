"use client";


import { useEffect, useState } from "react";
import AddBlog from "../add-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";




const initialBlogFromData ={
  title:"",
  description:"",
}

function BlogOverView({blogList}) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoadindg] =useState(false)
  const [blogFromData, setBlogFromData] = useState(initialBlogFromData)
  const [currentEditBlogItem, setCurrentEditBlogItem] = useState(null)
  const router = useRouter();
   
  useEffect(()=>{
    router.refresh()  //router.refresh() re-fetches the data of the current page without a full page reload.
  },[])

  console.log(blogFromData);

  async function handleSaveBlogData(){
    try{
      setLoadindg(true);
      const apiResponse =
        currentEditBlogItem !== null
          ? await fetch(`/api/update-blog?id=${currentEditBlogItem}`, {
              method: "PUT",
              body: JSON.stringify(blogFromData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFromData),
            });
      const result = await apiResponse.json()
      if (result?.success) {
        setBlogFromData(initialBlogFromData);
        setOpenBlogDialog(false);
        setLoadindg(false);
        setCurrentEditBlogItem(null);
        router.refresh();
      }
      console.log(result);
    }catch(error){
      console.log(error);
      setLoadindg(false)
      setBlogFromData(initialBlogFromData)
    }
  }
  async function handleDeleteBlogData(getCurrentId){
    try{
      const apiRespnse =await fetch(`/api/delete-blog?id=${getCurrentId}`,{
        method: "DELETE",
      })
      const result = apiRespnse.json();
      if(result?.success){
        router.refresh();
      }
    }catch(e){
      console.log(e) 
    }
  }
  function handleEditBlog(getCurrentBlog){
    setCurrentEditBlogItem(getCurrentBlog?._id)
    setBlogFromData({
      title :getCurrentBlog?.title,
      description : getCurrentBlog?.description,
    })
    setOpenBlogDialog(true)
  }
  console.log(currentEditBlogItem)


  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddBlog openBlogDialog={openBlogDialog} 
      setOpenBlogDialog={setOpenBlogDialog}
      loading ={loading}
      setLoadindg = {setLoadindg}
      blogFromData = {blogFromData}
      setBlogFromData = {setBlogFromData}
      handleSaveBlogData={handleSaveBlogData}
      currentEditedBlogId ={currentEditBlogItem}
      setCurrentEditBlogItem ={setCurrentEditBlogItem}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {
          blogList && blogList.length >0?
          blogList.map(blogItem=>
            <Card className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5 items-center">
                  <Button onClick={()=>handleEditBlog(blogItem)}>Edit</Button>
                  <Button onClick = {()=>handleDeleteBlogData(blogItem._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          )
          : <label className="text-3xl font-extrabold">No blog found. Add one .</label>
        }
      </div>
    </div>
  );
}
export default BlogOverView;
