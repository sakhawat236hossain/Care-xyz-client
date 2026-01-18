import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
    const { id } = await params; 
    const { status } = await request.json();

    console.log("Attempting to update ID:", id, "to Status:", status);

    try {
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid Booking ID format" }, { status: 400 });
        }

        const result = await bookingCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );

        console.log("MongoDB Result:", result);

        if (result.modifiedCount > 0) {
            return NextResponse.json({ message: "Status updated successfully" });
        } else {
            return NextResponse.json({ message: "No document matched or same status" }, { status: 200 });
        }
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
};