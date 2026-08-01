import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    // Await params for compatibility with modern Next.js versions
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const body = await request.json();
    const { name, category, price, unit, desc } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, category, and price are required." },
        { status: 400 }
      );
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price: Number(price),
        unit: unit || "",
        desc: desc || "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedService });
  } catch (error) {
    console.error("PUT Service API Error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A service with this name already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    // Await params for compatibility with modern Next.js versions
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        { success: false, error: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Service successfully deleted." });
  } catch (error) {
    console.error("DELETE Service API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
