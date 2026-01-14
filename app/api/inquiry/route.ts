import { NextResponse } from "next/server";

interface ConsultationData {
  name: string;
  company: string;
  email: string;
  phone: string;
  buildingType: string;
  challenges: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ConsultationData;

    // Validate required fields
    if (
      !data.name ||
      !data.company ||
      !data.email ||
      !data.phone ||
      !data.buildingType ||
      !data.challenges
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const {
      SMTP_HOST = "smtp.gmail.com",
      SMTP_PORT = "587",
      SMTP_USER,
      SMTP_PASS,
      CONSULTATION_TARGET_EMAIL = "sadhir.m@sustainabyte.ai",
      CONSULTATION_FROM_EMAIL,
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.warn("Email environment variables not configured");
      return NextResponse.json({
        ok: true,
        notice: "Email service not configured",
      });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New Consultation Request: ${data.company} - ${data.name}`;

    const companyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Consultation Request</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px 20px; background-color: #f8f9fa; line-height: 1.6; }
          .container { max-width: 650px; margin: 0 auto; background-color: white; border: 1px solid #e9ecef; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden; }
          .header { background: linear-gradient(90deg, #052657 0%, #4db846 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 12px 0 0 0; opacity: 0.9; font-size: 16px; font-weight: 400; }
          .content { padding: 40px 30px; }
          .consultation-details { background-color: #f8f9fa; border-radius: 6px; padding: 25px; margin: 25px 0; border: 1px solid #e9ecef; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 16px; padding: 12px 0; border-bottom: 1px solid #dee2e6; }
          .detail-row:last-child { border-bottom: none; margin-bottom: 0; }
          .detail-label { font-weight: 600; color: #495057; font-size: 15px; min-width: 140px; }
          .detail-value { color: #212529; font-size: 15px; text-align: right; font-weight: 500; }
          .message-section { background-color: #ffffff; border-left: 4px solid #4db846; padding: 20px 25px; margin: 25px 0; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(77, 184, 70, 0.1); }
          .message-title { font-weight: 600; color: #4db846; margin: 0 0 10px 0; font-size: 16px; }
          .message-text { color: #495057; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
          .footer { background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #dee2e6; }
          .footer p { margin: 0; color: #6c757d; font-size: 13px; }
          .timestamp { color: #adb5bd; font-size: 12px; margin-top: 10px; font-style: italic; }
          .company-info { background-color: #ffffff; padding: 20px 30px; border-top: 1px solid #dee2e6; }
          .company-name { font-size: 18px; font-weight: 600; color: #052657; margin-bottom: 5px; }
          .company-tagline { color: #6c757d; font-size: 14px; }
          @media (max-width: 600px) {
            body { padding: 20px 10px; }
            .container { margin: 0; border-radius: 0; }
            .header, .content, .footer, .company-info { padding: 20px; }
            .detail-row { flex-direction: column; gap: 6px; align-items: flex-start; }
            .detail-value { text-align: left; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Consultation Request</h1>
            <p>Facility Optimization Opportunity</p>
          </div>

          <div class="content">
            <div class="consultation-details">
              <div class="detail-row">
                <span class="detail-label">Contact Name:</span>
                <span class="detail-value">${data.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Company:</span>
                <span class="detail-value">${data.company}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${data.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${data.phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Building Type:</span>
                <span class="detail-value">${data.buildingType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Key Challenges:</span>
                <span class="detail-value">${data.challenges}</span>
              </div>
            </div>

            ${
              data.message
                ? `
              <div class="message-section">
                <div class="message-title">Additional Message</div>
                <div class="message-text">${data.message.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
            `
                : ""
            }
          </div>

          <div class="company-info">
            <div class="company-name">Sustainabyte</div>
            <div class="company-tagline">Smart Energy Solutions for Sustainable Facilities</div>
          </div>

          <div class="footer">
            <p>This consultation request was submitted through the website</p>
            <p class="timestamp">Received on: ${new Date().toLocaleString(
              "en-US",
              {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              }
            )}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const customerHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consultation Request Received</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 40px 20px; background-color: #f8f9fa; line-height: 1.6; }
          .container { max-width: 650px; margin: 0 auto; background-color: white; border: 1px solid #e9ecef; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden; }
          .header { background: linear-gradient(90deg, #052657 0%, #4db846 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 12px 0 0 0; opacity: 0.9; font-size: 16px; font-weight: 400; }
          .content { padding: 40px 30px; }
          .success-message { background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 25px; margin: 25px 0; color: #155724; }
          .next-steps { background-color: #f8f9fa; border-radius: 6px; padding: 25px; margin: 25px 0; border: 1px solid #e9ecef; }
          .next-steps h3 { margin: 0 0 15px 0; color: #052657; font-size: 18px; }
          .next-steps ul { margin: 0; padding-left: 20px; }
          .next-steps li { margin-bottom: 8px; color: #495057; }
          .contact-info { background-color: #ffffff; border-left: 4px solid #4db846; padding: 20px 25px; margin: 25px 0; border-radius: 0 6px 6px 0; box-shadow: 0 1px 3px rgba(77, 184, 70, 0.1); }
          .contact-title { font-weight: 600; color: #4db846; margin: 0 0 10px 0; font-size: 16px; }
          .contact-text { color: #495057; margin: 0; font-size: 15px; line-height: 1.6; }
          .footer { background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #dee2e6; }
          .footer p { margin: 0; color: #6c757d; font-size: 13px; }
          .company-info { background-color: #ffffff; padding: 20px 30px; border-top: 1px solid #dee2e6; }
          .company-name { font-size: 18px; font-weight: 600; color: #052657; margin-bottom: 5px; }
          .company-tagline { color: #6c757d; font-size: 14px; }
          @media (max-width: 600px) {
            body { padding: 20px 10px; }
            .container { margin: 0; border-radius: 0; }
            .header, .content, .footer, .company-info { padding: 20px; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Consultation Request Received</h1>
            <p>Thank you for choosing Sustainabyte</p>
          </div>

          <div class="content">
            <div class="success-message">
              <strong>✓ Your consultation request has been successfully submitted!</strong><br>
              We've received your information and our team will review it shortly.
            </div>

            <div class="next-steps">
              <h3>What happens next?</h3>
              <ul>
                <li>Our experts will review your facility details within 24-48 hours</li>
                <li>We'll schedule a one-hour discovery session at your convenience</li>
                <li>During the session, we'll identify optimization opportunities specific to your facility</li>
                <li>You'll receive a detailed assessment with potential energy savings and ROI projections</li>
              </ul>
            </div>

            <div class="contact-info">
              <div class="contact-title">Questions?</div>
              <div class="contact-text">
                If you have any immediate questions or need to update your request, please contact us at:<br>
                <strong>Email:</strong> info@sustainabyte.ai<br>
                <strong>Phone:</strong> Available during business hours
              </div>
            </div>
          </div>

          <div class="company-info">
            <div class="company-name">Sustainabyte</div>
            <div class="company-tagline">Smart Energy Solutions for Sustainable Facilities</div>
          </div>

          <div class="footer">
            <p>We look forward to helping optimize your facility's energy performance</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: CONSULTATION_FROM_EMAIL || SMTP_USER,
      to: CONSULTATION_TARGET_EMAIL,
      subject,
      html: companyHtml,
    });

    await transporter.sendMail({
      from: CONSULTATION_FROM_EMAIL || SMTP_USER,
      to: data.email,
      subject: "Consultation Request Received - Sustainabyte",
      html: customerHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Consultation error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
