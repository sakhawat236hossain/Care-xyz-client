import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const body = await request.json();
        const serviceCollection = await dbConnect(collections.SERVICES);
        
        const result = await serviceCollection.insertOne(body);

        return NextResponse.json({ message: "Service added", id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to add service" }, { status: 500 });
    }
};