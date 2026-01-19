import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const userCollection = await dbConnect(collections.USERS);
        const users = await userCollection.find().toArray();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
};