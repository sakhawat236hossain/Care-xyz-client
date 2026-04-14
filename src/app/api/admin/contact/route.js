// app/api/contact/route.js
import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const messageCollection = await dbConnect(collections.MESSAGES);
    const body = await req.json();

    const result = await messageCollection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messageCollection = await dbConnect(collections.MESSAGES);
    
    const messages = await messageCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}