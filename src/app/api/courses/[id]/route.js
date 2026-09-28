import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Course from "@/models/Course";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const body = await request.json();
    const { name, description, duration, price, icon, color, border, tag, status } = body;

    if (!name || !duration || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, duration, and price are required." },
        { status: 400 }
      );
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        name,
        description,
        duration,
        price: Number(price),
        icon,
        color,
        border,
        tag,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("PUT Course API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { success: false, error: "Course not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Course deleted." });
  } catch (error) {
    console.error("DELETE Course API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
