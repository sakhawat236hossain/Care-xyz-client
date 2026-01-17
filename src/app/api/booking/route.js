import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const bookingData = await request.json();
    const bookingCollection = await dbConnect(collections.BOOKINGS); 
    
    const result = await bookingCollection.insertOne({
      ...bookingData,
      status: "pending",
      bookedAt: new Date(),
    });

    return NextResponse.json({ message: "Booking Successful", id: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Booking Failed" }, { status: 500 });
  }
};