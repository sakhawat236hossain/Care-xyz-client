import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
    try {
        const { id } = await params;
        const serviceCollection = await dbConnect(collections.SERVICES);
        
        const result = await serviceCollection.deleteOne({ 
            _id: new ObjectId(id) 
        });

        if (result.deletedCount > 0) {
            return NextResponse.json({ message: "Service deleted" }, { status: 200 });
        }
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting service" }, { status: 500 });
    }
};