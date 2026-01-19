import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const bookingData = await request.json();
    const bookingCollection = await dbConnect(collections.BOOKINGS); 
    
    const result = await bookingCollection.insertOne({
      ...bookingData,
      status: "pending",
      bookedAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

 
  const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0; text-transform: uppercase; font-style: italic;">Care-Sync</h1>
          <p style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 2px;">Official Booking Invoice</p>
        </div>
        
        <div style="padding: 20px 0;">
          <p>Hi <strong>${bookingData.userName}</strong>,</p>
          <p>Your booking request has been successfully placed. Our team will review and contact you shortly.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #2563eb;">Service Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;">Service:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${bookingData.serviceTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Duration:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${bookingData.duration}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Location:</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold;">${bookingData.location?.area}, ${bookingData.location?.district}</td>
              </tr>
              <tr style="border-top: 1px solid #ddd;">
                <td style="padding: 15px 0; font-size: 18px; font-weight: bold; color: #2563eb;">Total Paid:</td>
                <td style="padding: 15px 0; text-align: right; font-size: 18px; font-weight: bold; color: #2563eb;">$${bookingData.totalCost}</td>
              </tr>
            </table>
          </div>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 10px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          <p>This is an automated invoice. No signature required.</p>
          <p>© 2026 Care-Sync Service. All rights reserved.</p>
        </div>
      </div>
    `;


    await transporter.sendMail({
  from: `"Care-Sync" <${process.env.EMAIL_USER}>`,
  to: bookingData.userEmail, 
  bcc: process.env.EMAIL_USER,
  subject: `Booking Confirmed: ${bookingData.serviceTitle}`,
  html: emailHtml,
});

    return NextResponse.json({ 
      message: "Booking Successful & Invoice Sent", 
      id: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Booking Failed" }, { status: 500 });
  }
};