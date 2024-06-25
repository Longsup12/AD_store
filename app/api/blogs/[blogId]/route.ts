import Collection from "@/lib/models/Collection";
import Blog from "@/lib/models/Blog";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { blogId: string } }
) => {
  try {
    await connectToDB();

    const blog = await Blog.findById(params.blogId).populate({
      path: "collections",
      model: Collection,
    });

    if (!blog) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(blog), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[blogId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { blogId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const blog = await Blog.findById(params.blogId);

    if (!blog) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags
    } = await req.json();

    const addedCollections = collections.filter(
      (collectionId: string) => !blog.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = blog.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this blog
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { blogs: blog._id },
        })
      ),

      // Update removed collections without this blog
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { blogs: blog._id },
        })
      ),
    ]);

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      blog._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedBlog.save();

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.log("[blogId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { blogId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const blog = await Blog.findById(params.blogId);

    if (!blog) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );
    }

    await Blog.findByIdAndDelete(blog._id);

    // Update collections
    await Promise.all(
      blog.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { blogs: blog._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Blog deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[blogId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

