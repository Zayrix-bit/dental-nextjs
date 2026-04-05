import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;

    if (!gmailUser || !gmailPass) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Gmail credentials (GMAIL_USER, GMAIL_APP_PASS) are missing in environment variables!");
      }
      return NextResponse.json({ 
        success: false,
        error: "Server configuration error. Contact support."
      }, { status: 500 });
    }

    const { name, email, phone, service } = await req.json();

    if (!name || !phone || !service) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: Name, Phone, and Treatment" 
      }, { status: 400 });
    }

    // Configure Nodemailer Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // 1. Send Clinic Notification (Priority)
    let clinicEmailError = null;
    try {
      await transporter.sendMail({
        from: `"Clinic Alerts" <${gmailUser}>`, 
        to: "jeevankart.in@gmail.com", 
        replyTo: email || undefined,
        subject: `New Lead: ${name} — ${service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #0c4a6e; border-bottom: 2px solid #0ea5e9; padding-bottom: 12px; margin-top: 0;">New Consultation Request</h2>
            <div style="padding: 10px 0;">
              <p style="margin: 8px 0;"><strong style="color: #64748b;">Patient Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong style="color: #64748b;">Phone Number:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong style="color: #64748b;">Email Address:</strong> ${email || "Not provided"}</p>
              <p style="margin: 8px 0;"><strong style="color: #64748b;">Treatment Interest:</strong> ${service}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
            <footer style="font-size: 13px; color: #94a3b8; line-height: 1.6;">
              <strong>Action Required:</strong> Please contact this patient within the next 15 minutes to maximize conversion and clinical trust.
            </footer>
          </div>
        `,
      });
    } catch (e) {
      clinicEmailError = e;
    }

    // 2. Send Patient Confirmation (Silent / High-End Concierge)
    const isValidEmail = email && EMAIL_REGEX.test(email);
    if (isValidEmail && !clinicEmailError) {
      try {
        await transporter.sendMail({
          from: `"DentalCare" <${gmailUser}>`, 
          to: email,
          subject: "Your Consultation Request Has Been Received",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Consultation Request Received</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                
                <!-- Navy Top Bar (Clinical Authority) -->
                <div style="background-color: #0A3A5C; height: 12px; font-size: 1px; line-height: 1px;">&nbsp;</div>

                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                        
                        <!-- Header Area (Apple-Style Minimalist) -->
                        <tr>
                          <td style="padding: 48px 32px 24px 32px; text-align: center;">
                            <div style="font-size: 26px; font-weight: 900; color: #111827; letter-spacing: -0.06em; line-height: 1; display: inline-block;">
                              DentalCare
                            </div>
                            <div style="margin-top: 28px; border-top: 1px solid #f3f4f6;"></div>
                          </td>
                        </tr>

                        <!-- Hero Message -->
                        <tr>
                          <td style="padding: 0 40px 32px 40px;">
                            <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #111827; letter-spacing: -0.04em; line-height: 1.2;">
                              Your Consultation Request Has Been Received
                            </h1>
                            <p style="margin: 16px 0 0 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
                              Our team will contact you shortly to confirm your appointment details and prepare for your visit.
                            </p>
                          </td>
                        </tr>

                        <!-- Patient Data Card -->
                        <tr>
                          <td style="padding: 0 40px 32px 40px;">
                            <div style="padding: 24px; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 12px;">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="padding-bottom: 24px;">
                                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; margin-bottom: 6px;">Patient Name</div>
                                    <div style="font-size: 16px; font-weight: 600; color: #0f172a;">${name}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding-bottom: 24px;">
                                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; margin-bottom: 6px;">Phone Number</div>
                                    <div style="font-size: 16px; font-weight: 600; color: #0f172a;">${phone}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; margin-bottom: 6px;">Treatment Interested</div>
                                    <div style="font-size: 16px; font-weight: 600; color: #0f172a;">${service}</div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>

                        <!-- Trust / Response Time -->
                        <tr>
                          <td style="padding: 0 40px 32px 40px;">
                            <div style="font-size: 13px; color: #64748b; line-height: 1.8;">
                              <span style="display: block; margin-bottom: 4px;">• We typically respond within <strong style="color: #0f172a;">15–30 minutes</strong> during clinic hours.</span>
                              <span>• Your clinical data is secure, confidential, and prepared for our specialist's review.</span>
                            </div>
                          </td>
                        </tr>

                        <!-- Main CTA -->
                        <tr>
                          <td style="padding: 0 40px 48px 40px; text-align: center;">
                            <a href="tel:+15551234567" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 16px 36px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 10px; letter-spacing: -0.01em;">
                              Contact Clinic
                            </a>
                          </td>
                        </tr>

                        <!-- Clinic Footer Block -->
                        <tr>
                          <td style="padding: 0 40px;">
                            <div style="border-top: 1px solid #f3f4f6;"></div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 32px 40px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td>
                                  <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
                                    <strong style="color: #111827;">DentalCare Clinic</strong><br>
                                    123 Dental Street, Medical District<br>
                                    New York, NY 10001, USA
                                  </div>
                                  <div style="margin-top: 16px; font-size: 13px; color: #64748b;">
                                    <strong style="color: #111827;">Phone:</strong> +1 (555) 123-4567<br>
                                    <a href="https://wa.me/15551234567?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment" style="color: #0ea5e9; text-decoration: none; font-weight: 600; border-bottom: 1px solid #0ea5e9;">Message on WhatsApp &rarr;</a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                      </table>

                      <!-- Final Branding Footer -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px;">
                        <tr>
                          <td style="padding: 24px 32px; text-align: center;">
                            <div style="font-size: 12px; color: #94a3b8; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;">
                              DentalCare &mdash; Private Dental Clinic
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error("Patient Confirmation Error:", err);
        }
      }
    }

    if (clinicEmailError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Clinic Notification Error:", clinicEmailError);
      }
      return NextResponse.json({ 
        success: false, 
        error: "Failed to process lead" 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("API Route Error:", err);
    }
    return NextResponse.json({ 
      success: false, 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}
