import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { id } = await params; 

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const serviceCollection = await dbConnect(collections.SERVICES);
        const result = await serviceCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ message: "Service deleted" }, { status: 200 });
        }
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}