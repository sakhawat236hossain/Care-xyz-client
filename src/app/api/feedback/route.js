import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const body = await request.json();
    const feedbackCollection = await dbConnect("feedbacks");
    
    const result = await feedbackCollection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbackCollection = await dbConnect("feedbacks");
    const data = await feedbackCollection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}