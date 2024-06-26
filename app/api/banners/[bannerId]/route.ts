import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Banner from "@/lib/models/Banner";

export const GET = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    await connectToDB();

    const banner = await Banner.findById(params.bannerId);

    return NextResponse.json(banner, { status: 200 });
  } catch (err) {
    console.log("[bannerId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let banner = await Banner.findById(params.bannerId);

    if (!banner) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    const { title, isActive, headBanner, diaryTittle, diaryBanner, diaryDescription, midBanner, avatar  } = await req.json();

    banner = await Banner.findByIdAndUpdate(
      params.bannerId,
      { title, isActive, headBanner, diaryTittle, diaryBanner, diaryDescription, midBanner, avatar },
      { new: true }
    );

    await banner.save();

    return NextResponse.json(banner, { status: 200 });
  } catch (err) {
    console.log("[bannerId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Banner.findByIdAndDelete(params.bannerId);

    await Banner.updateMany(
      { banners: params.bannerId },
      { $pull: { banners: params.bannerId } }
    );
    
    return new NextResponse("Banner is deleted", { status: 200 });
  } catch (err) {
    console.log("[bannerId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
