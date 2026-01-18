import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        const bookings = await bookingCollection.find().sort({ bookedAt: -1 }).toArray();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
    }
};