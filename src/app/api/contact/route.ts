import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { COMPANY } from "@/lib/company";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactInquiryEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting (5 requests per 15-minute sliding window)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    const rateLimitCheck = rateLimit(clientIp, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateLimitCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from your connection. Please wait ${Math.ceil(rateLimitCheck.reset / 60)} minutes before submitting again, or email us directly at ${COMPANY.supportEmail}.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitCheck.reset.toString(),
            "X-RateLimit-Limit": rateLimitCheck.limit.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const json = await req.json();

    // 2. Zod Validation
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

    // 3. Honeypot check (silently drop bot submissions)
    if (data.fax_number && data.fax_number.length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Time-to-submit check (bots submit instantaneously in < 1500ms)
    if (data.formRenderTime) {
      const elapsed = Date.now() - data.formRenderTime;
      if (elapsed < 1500) {
        return NextResponse.json({ success: true, message: "Inquiry received." });
      }
    }

    // 5. Dispatch email via Resend
    const emailResult = await sendContactInquiryEmail(data);

    if (!emailResult.sent && emailResult.error) {
      console.error("[CONTACT ROUTE] Email dispatch warning:", emailResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Thank you! We have received your inquiry for ${data.projectType}. Our team will review and reply to ${data.email} within 1 business day.`,
      },
      {
        headers: {
          "X-RateLimit-Limit": rateLimitCheck.limit.toString(),
          "X-RateLimit-Remaining": rateLimitCheck.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `An unexpected server error occurred. Please reach out directly to ${COMPANY.supportEmail}`,
      },
      { status: 500 }
    );
  }
}

