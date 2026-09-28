import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Course from "@/models/Course";

const initialCourses = [
  {
    name: "Pro Makeup Course",
    description: "Master bridal, party & editorial makeup techniques with hands-on practice, live model demos, and kit guide.",
    duration: "6 Weeks",
    price: 15000,
    icon: "💄",
    color: "from-pink-50/60 to-rose-50/60 hover:from-pink-50 hover:to-rose-100/50",
    border: "#fecdd3",
    tag: "Bestseller",
    status: "Published",
  },
  {
    name: "Nail Art Course",
    description: "Creative nail designs, gel extensions, acrylic builds, chromes, 3D art & professional manicure systems.",
    duration: "3 Weeks",
    price: 8000,
    icon: "💅",
    color: "from-fuchsia-50/60 to-purple-50/60 hover:from-fuchsia-50 hover:to-purple-100/50",
    border: "#e9d5ff",
    tag: "Trending",
    status: "Published",
  },
  {
    name: "Mehndi / Henna Course",
    description: "Traditional bridal patterns, modern Arabic layouts, shading techniques & chemical-free mehndi preparation.",
    duration: "4 Weeks",
    price: 6000,
    icon: "🌿",
    color: "from-orange-50/60 to-amber-50/60 hover:from-orange-50 hover:to-amber-100/50",
    border: "#fed7aa",
    tag: "Popular",
    status: "Published",
  },
  {
    name: "Modeling Course",
    description: "Ramp walk mechanics, photogenic posing guidelines, camera confidence & portfolio creation tutorials.",
    duration: "4 Weeks",
    price: 12000,
    icon: "🎭",
    color: "from-sky-50/60 to-blue-50/60 hover:from-sky-50 hover:to-blue-100/50",
    border: "#bae6fd",
    tag: "New",
    status: "Published",
  },
];

export async function GET() {
  try {
    await dbConnect();

    let courses = await Course.find({}).sort({ createdAt: -1 });

    if (courses.length === 0) {
      console.log("No courses found. Seeding...");
      await Course.insertMany(initialCourses);
      courses = await Course.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("GET Courses API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, description, duration, price, icon, color, border, tag, status } = body;

    if (!name || !duration || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, duration, and price are required." },
        { status: 400 }
      );
    }

    const newCourse = await Course.create({
      name,
      description,
      duration,
      price: Number(price),
      icon,
      color,
      border,
      tag,
      status: status || "Published",
    });

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    console.error("POST Courses API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    );
  }
}
