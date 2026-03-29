import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("DEBUG: RESEND_API_KEY is missing in environment variables!");
      return NextResponse.json({ 
        message: "Email setup incomplete: Missing RESEND_API_KEY in server settings.",
        error: "Missing API Key"
      }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, service, date, time, message } = await req.json();

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Simplified for testing
      to: ["jeevankart.in@gmail.com"],
      replyTo: email,
      subject: `New Appointment Request: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0c4a6e; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">New Appointment Request</h2>
          <p><strong>Patient Name:</strong> ${name}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Selected Service:</strong> ${service}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Preferred Time:</strong> ${time}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Patient Message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 5px; color: #475569;">
            ${message || "No additional message provided."}
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
            This is an automated notification from your Dental Clinic website.
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error Detail:", JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        message: "Failed to send email", 
        error: error.message || error.name || "Unknown Resend error" 
      }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
