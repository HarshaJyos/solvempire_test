import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { COMPANY } from "@/lib/company";

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // 1. Zod Validation
    const parsed = contactFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // 2. Honeypot check
    if (data.fax_number && data.fax_number.length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 3. Time-to-submit check (bots submit instantaneously in < 1500ms)
    if (data.formRenderTime) {
      const elapsed = Date.now() - data.formRenderTime;
      if (elapsed < 1500) {
        return NextResponse.json({ success: true, message: "Inquiry received." });
      }
    }

    // 4. Log or dispatch inquiry
    // In production, dispatch via Resend / Nodemailer to COMPANY.email (hello@solvempire.com)
    // {{TODO: needs content: integrate RESEND_API_KEY env variable when live API key is configured}}
    console.info(`[INQUIRY RECEIVED] From: ${data.name} <${data.email}> | Type: ${data.projectType} | Stage: ${data.stage}`);

    return NextResponse.json({
      success: true,
      message: `Thank you! We have received your inquiry for ${data.projectType}. Our team will review and reply to ${data.email} within 1 business day.`,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please reach out directly to " + COMPANY.email,
      },
      { status: 500 }
    );
  }
}
