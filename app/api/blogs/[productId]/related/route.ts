import Blog from "@/lib/models/Blog";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { blogId: string } }) => {
  try {
    await connectToDB()

    const blog = await Blog.findById(params.blogId)

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), { status: 404 })
    }

    const relatedBlogs = await Blog.find({
      $or: [
        { category: blog.category },
        { collections: { $in: blog.collections }}
      ],
      _id: { $ne: blog._id } // Exclude the current blog
    })

    if (!relatedBlogs) {
      return new NextResponse(JSON.stringify({ message: "No related blogs found" }), { status: 404 })
    }

    return NextResponse.json(relatedBlogs, { status: 200 })
  } catch (err) {
    console.log("[related_GET", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
