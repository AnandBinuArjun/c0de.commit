import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation/contact";
import { checkDistributedRateLimit } from "@/lib/security/rate-limit";
import { getValidatedServerEnv } from "@/lib/security/env";
import { saveContactSubmission } from "@/lib/db/repositories";
import { dispatchContactNotifications } from "@/lib/integrations/notifications";

export async function POST(req: NextRequest) {
  const env = getValidatedServerEnv();

  const forwardedFor = req.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  // 1. Distributed Rate Limit Check (Memory + Optional Upstash Redis / PostgreSQL)
  const rateLimit = await checkDistributedRateLimit(
    clientIp,
    env.RATE_LIMIT_MAX_REQUESTS,
    env.RATE_LIMIT_WINDOW_MS
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Please wait before submitting another project enquiry.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rateLimit.resetInMs / 1000)),
          "X-RateLimit-Backend": rateLimit.backend,
        },
      }
    );
  }

  // 2. Parse JSON Body Safely
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON payload.",
      },
      { status: 400 }
    );
  }

  // 3. Honeypot Spam Check
  if (
    typeof rawBody === "object" &&
    rawBody !== null &&
    "websiteUrl" in rawBody &&
    typeof (rawBody as { websiteUrl?: unknown }).websiteUrl === "string" &&
    ((rawBody as { websiteUrl: string }).websiteUrl || "").trim().length > 0
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Automated submission rejected.",
      },
      { status: 400 }
    );
  }

  // 4. Strict Zod Server-Side Validation (including Secret Pattern Rejection)
  const parsed = contactSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstMessage =
      Object.values(fieldErrors).flat()[0] || "Validation failed for submitted fields.";
    return NextResponse.json(
      {
        success: false,
        error: firstMessage,
        fieldErrors,
      },
      { status: 400 }
    );
  }

  // 5. Persist Submission (PostgreSQL via Prisma or Safe Fallback Ledger)
  const stored = await saveContactSubmission(parsed.data, clientIp);

  // 6. Dispatch Server-Side Webhook / Email Notifications (Non-Blocking Safe Execution)
  const notificationStatus = await dispatchContactNotifications(stored);

  return NextResponse.json(
    {
      success: true,
      referenceCode: stored.referenceCode,
      createdAt: stored.createdAt,
      persistedInDatabase: stored.persistedInDatabase,
      notifications: notificationStatus,
      message:
        "Project enquiry initialized. Your scope request has been logged for engineering review.",
    },
    { status: 201 }
  );
}
