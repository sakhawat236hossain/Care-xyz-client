import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

