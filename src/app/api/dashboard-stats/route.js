import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const role = searchParams.get("role");

    try {
        const bookingCollection = await dbConnect(collections.BOOKINGS);
        
        let stats = {};

        if (role === "admin") {
            const totalBookings = await bookingCollection.countDocuments();
            const pendingBookings = await bookingCollection.countDocuments({ status: "pending" });
            stats = { totalBookings, pendingBookings };
        } else {
            const userTotal = await bookingCollection.countDocuments({ userEmail: email });
            const userPending = await bookingCollection.countDocuments({ userEmail: email, status: "pending" });
            stats = { totalBookings: userTotal, pendingBookings: userPending };
        }

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
    }
};