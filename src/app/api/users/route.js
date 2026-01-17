import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const { name, email, password,image,phone } = await request.json();
    const userCollection = await dbConnect(collections.USERS);

    const isExist = await userCollection.findOne({ email });
    if (isExist) {
      return NextResponse.json({ message: "user already exist" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone,
      image,
      role: "user", 
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);
    return NextResponse.json({ message: "Registration Successful", result }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error occurred" }, { status: 500 });
  }
};