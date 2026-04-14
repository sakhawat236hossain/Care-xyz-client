// app/api/contact/route.js
import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
// POST /api/contact - Save a new contact message

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

// GET /api/contact - Get all contact messages (for admin)

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

// DELETE /api/contact?id=123

export async function DELETE(request) {
  try {
    const messageCollection = await dbConnect(collections.MESSAGES);
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await messageCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}