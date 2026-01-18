import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
    try {
        const { id } = await params;
        const body = await request.json();
        
        const { _id, ...updateData } = body;

        const serviceCollection = await dbConnect(collections.SERVICES);
        
        const result = await serviceCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Service updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
    }
};