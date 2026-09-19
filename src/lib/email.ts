import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/company";

export interface ContactInquiryPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  stage: string;
  timeline: string;
  budget?: string;
  description: string;
}

export interface EmailDispatchResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Creates and caches the Nodemailer transporter based on SMTP environment variables.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, ""); // sanitize Gmail app passwords with spaces
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!user || !pass) {
    return null;
  }

  if (host.includes("gmail") || user.endsWith("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}


/**
 * Dispatches the project scoping inquiry to SolveMpire support/engineering team
 * using Nodemailer SMTP.
 */
export async function sendContactInquiryEmail(
  payload: ContactInquiryPayload
): Promise<EmailDispatchResult> {
  const { name, email, company, projectType, stage, timeline, budget, description } = payload;
  const toAddress = process.env.CONTACT_RECEIVER_EMAIL || COMPANY.supportEmail;
  const fromAddress = process.env.SMTP_FROM || `SolveMpire Inquiries <${COMPANY.supportEmail}>`;

  const transporter = getTransporter();

  if (!transporter) {
    // If SMTP credentials are not yet set in .env.local, log structured details in dev
    console.info(
      `[NODEMAILER DEV LOG] SMTP not configured. Destination: ${toAddress}\n` +
      `Inquiry Details:\n` +
      `  Name: ${name}\n` +
      `  Email: ${email}\n` +
      `  Company: ${company || "N/A"}\n` +
      `  Discipline: ${projectType}\n` +
      `  Stage: ${stage}\n` +
      `  Timeline: ${timeline}\n` +
      `  Budget: ${budget || "N/A"}\n` +
      `  Notes: ${description}`
    );
    return { sent: true, messageId: "dev-simulated-id" };
  }

  try {
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a; background-color: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #000000; color: #ffffff; padding: 24px 32px; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .badge { display: inline-block; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-top: 8px; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #0f172a; font-weight: 500; }
    .field-box { background: #f1f5f9; border-radius: 8px; padding: 14px 16px; font-size: 14px; color: #1e293b; white-space: pre-wrap; margin-top: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚀 New Project Scoping Inquiry</h2>
      <span class="badge">${projectType}</span>
    </div>
    <div class="content">
      <div class="grid">
        <div class="field-group">
          <div class="field-label">Contact Name</div>
          <div class="field-value">${name}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Email Address</div>
          <div class="field-value"><a href="mailto:${email}">${email}</a></div>
        </div>
      </div>
      <div class="grid">
        <div class="field-group">
          <div class="field-label">Company / Organization</div>
          <div class="field-value">${company || "Not specified"}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Target Timeline</div>
          <div class="field-value">${timeline}</div>
        </div>
      </div>
      <div class="field-group">
        <div class="field-label">Current Project Stage</div>
        <div class="field-value">${stage}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Project Scope &amp; Constraints</div>
        <div class="field-box">${description}</div>
      </div>
    </div>
    <div class="footer">
      Sent from <a href="https://www.solvempire.com">www.solvempire.com</a> project scoping wizard.<br />
      SolveMpire Private Limited • Support: ${COMPANY.supportEmail}
    </div>
  </div>
</body>
</html>
`;

    const info = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `[New Inquiry] ${projectType} - ${name} (${company || "Direct"})`,
      text: `New Project Inquiry from ${name} <${email}>\nDiscipline: ${projectType}\nStage: ${stage}\nTimeline: ${timeline}\nCompany: ${company || "N/A"}\n\nNotes:\n${description}`,
      html: htmlBody,
    });

    return { sent: true, messageId: info.messageId };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown email sending error";
    console.error("[NODEMAILER ERROR]", errorMsg);
    return { sent: false, error: errorMsg };
  }
}
