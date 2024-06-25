import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Blog from "@/lib/models/Blog";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
    } = await req.json();

    const newBlog = await Blog.create({
      title,
      description,
      media,
      category,
      collections,
      tags
    });

    await newBlog.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.blogs.push(newBlog._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newBlog, { status: 200 });
  } catch (err) {
    console.log("[blogs_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const blogs = await Blog.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.log("[blogs_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

