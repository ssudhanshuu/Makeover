import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all gallery items and sort them by order
    const galleryItems = await Gallery.find({}).sort({ order: 1 });

    const photos = galleryItems.filter((item) => item.type === "photo");
    const videos = galleryItems.filter((item) => item.type === "video");

    return NextResponse.json({ success: true, photos, videos });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
