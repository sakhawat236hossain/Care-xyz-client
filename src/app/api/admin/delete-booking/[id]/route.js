// api/admin/delete-booking/[id]/route.js
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
    try {
        const { id } = await params; 
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ message: "Deleted" }, { status: 200 });
        }
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
};