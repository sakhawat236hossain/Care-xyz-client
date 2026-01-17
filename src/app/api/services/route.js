import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const serviceCollection = await dbConnect(collections.SERVICES);
    const services = await serviceCollection.find({}).toArray();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 });
  }
};