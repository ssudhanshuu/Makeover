import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { type, src, thumb, label, title, duration, youtubeId } = body;

    if (!type) {
      return NextResponse.json({ success: false, error: "Type is required" }, { status: 400 });
    }

    const newItem = await Gallery.create({
      type,
      src,
      thumb,
      label,
      title,
      duration,
      youtubeId,
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("POST Gallery API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    console.error("DELETE Gallery API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
