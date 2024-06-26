import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Banner from "@/lib/models/Banner";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, isActive, headBanner, diaryTittle, diaryBanner, diaryDescription, midBanner, avatar  } = await req.json()

    const existingBanner = await Banner.findOne({ title })

    if (existingBanner) {
      return new NextResponse("Banner already exists", { status: 400 })
    }

    const newBanner = await Banner.create({
        title, isActive, headBanner, diaryTittle, diaryBanner, diaryDescription, midBanner, avatar 
    })

    await newBanner.save()

    return NextResponse.json(newBanner, { status: 200 })
  } catch (err) {
    console.log("[banners_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const banners = await Banner.find().sort({ createdAt: "desc" })

    return NextResponse.json(banners, { status: 200 })
  } catch (err) {
    console.log("[banners_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
