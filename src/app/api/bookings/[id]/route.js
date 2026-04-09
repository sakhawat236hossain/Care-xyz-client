

import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = await params;
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        
        const booking = await bookingCollection.findOne({ _id: new ObjectId(id) });

        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json(booking, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = await params;
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        
        const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};