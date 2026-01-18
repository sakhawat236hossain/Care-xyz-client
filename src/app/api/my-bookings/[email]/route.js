import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {

    const { email } = await params; 
    
    try {
        const bookingCollection = await dbConnect(collections.BOOKINGS);

        const result = await bookingCollection.find({ userEmail: email }).toArray();

        if (!result || result.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};