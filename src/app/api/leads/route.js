import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await dbConnect();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("GET Leads API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, phone, email, message, service, date, time, requests, type } = body;

    if (!name || !phone || !type) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and type are required." },
        { status: 400 }
      );
    }

    const newLead = await Lead.create({
      name,
      phone,
      email,
      message,
      service,
      date,
      time,
      requests,
      type,
    });

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    console.error("POST Leads API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
