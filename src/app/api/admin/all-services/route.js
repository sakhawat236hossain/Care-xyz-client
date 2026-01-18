import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const serviceCollection = await dbConnect(collections.SERVICES);
        // সব সার্ভিস ডাটাবেজ থেকে নিয়ে আসা
        const services = await serviceCollection.find().toArray();
        
        return NextResponse.json(services, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 });
    }
};

