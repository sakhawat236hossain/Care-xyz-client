import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
    try {
        const { id } = await params;
        const { role } = await request.json();

        const userCollection = await dbConnect(collections.USERS);
        const result = await userCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { role: role } }
        );

        return NextResponse.json({ message: "Role updated" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
};