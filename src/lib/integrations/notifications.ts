import { getValidatedServerEnv } from "@/lib/security/env";
import type { StoredContactSubmission } from "@/lib/db/repositories";

export interface NotificationDispatchResult {
  webhookDispatched: boolean;
  emailDispatched: boolean;
}

/**
 * Safely dispatches project enquiry notifications to configured server-side channels:
 * - Discord / Slack / Custom Webhook (`CONTACT_WEBHOOK_URL`)
 * - Resend Transactional Email API (`RESEND_API_KEY` -> `CONTACT_NOTIFICATION_EMAIL`)
 * Never exposes credentials to the client and never throws if optional integrations are unset.
 */
export async function dispatchContactNotifications(
  submission: StoredContactSubmission
): Promise<NotificationDispatchResult> {
  const env = getValidatedServerEnv();
  let webhookDispatched = false;
  let emailDispatched = false;

  // 1. Webhook Notification (Discord / Slack / Custom SOAR Webhook)
  if (env.CONTACT_WEBHOOK_URL) {
    try {
      const payload = {
        username: "CODE.COMMIT Intake Console",
        content: `**[INITIALIZE PROJECT]** New enquiry logged — Reference: \`${submission.referenceCode}\``,
        embeds: [
          {
            title: `Project Enquiry: ${submission.serviceCategory}`,
            color: 0x00f58a,
            fields: [
              { name: "Reference Code", value: submission.referenceCode, inline: true },
              { name: "Client Name", value: submission.fullName, inline: true },
              {
                name: "Organisation",
                value: submission.organisation || "Not specified",
                inline: true,
              },
              { name: "Work Email", value: submission.workEmail, inline: true },
              { name: "Preferred Timeline", value: submission.preferredTimeline, inline: true },
              {
                name: "Scope Summary",
                value: submission.projectDescription.slice(0, 900),
                inline: false,
              },
            ],
            timestamp: submission.createdAt,
          },
        ],
      };

      const res = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhookDispatched = res.ok;
    } catch {
      webhookDispatched = false;
    }
  }

  // 2. Resend Email Notification
  if (env.RESEND_API_KEY) {
    try {
      const htmlBody = `
        <div style="background-color:#030806;color:#F3F8F5;padding:32px;font-family:sans-serif;border:1px solid #204D35;border-radius:12px;">
          <p style="color:#00F58A;font-family:monospace;font-size:12px;letter-spacing:0.15em;margin:0 0 8px 0;">
            [ SYSTEM ONLINE ] — CODE.COMMIT PROJECT INTAKE
          </p>
          <h2 style="color:#F3F8F5;margin:0 0 16px 0;">
            New Project Enquiry: ${submission.referenceCode}
          </h2>
          <table style="width:100%;border-collapse:collapse;background-color:#101D15;border:1px solid #204D35;border-radius:8px;padding:16px;">
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Reference Code:</td><td style="padding:10px 14px;color:#00F58A;font-family:monospace;font-weight:bold;">${submission.referenceCode}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Client Name:</td><td style="padding:10px 14px;color:#F3F8F5;font-weight:bold;">${submission.fullName}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Work Email:</td><td style="padding:10px 14px;color:#F3F8F5;">${submission.workEmail}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Organisation:</td><td style="padding:10px 14px;color:#F3F8F5;">${submission.organisation || "Not specified"}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Service Track:</td><td style="padding:10px 14px;color:#00F58A;font-family:monospace;">${submission.serviceCategory}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Preferred Timeline:</td><td style="padding:10px 14px;color:#F3F8F5;">${submission.preferredTimeline}</td></tr>
            <tr><td style="padding:10px 14px;color:#A5B7AA;font-size:13px;">Timestamp (UTC):</td><td style="padding:10px 14px;color:#A5B7AA;font-family:monospace;">${submission.createdAt}</td></tr>
          </table>
          <h3 style="color:#00F58A;font-family:monospace;font-size:13px;margin:20px 0 8px 0;">SUBMITTED SCOPE &amp; OBJECTIVES</h3>
          <div style="background-color:#0B1710;border:1px solid #204D35;border-radius:8px;padding:16px;color:#F3F8F5;line-height:1.6;font-size:14px;white-space:pre-wrap;">${submission.projectDescription}</div>
        </div>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [env.CONTACT_NOTIFICATION_EMAIL],
          reply_to: submission.workEmail,
          subject: `[CODE.COMMIT] Project Enquiry ${submission.referenceCode} — ${submission.serviceCategory}`,
          html: htmlBody,
          text: [
            `CODE.COMMIT — INITIALIZE PROJECT NOTIFICATION`,
            `Reference Code: ${submission.referenceCode}`,
            `Timestamp: ${submission.createdAt}`,
            `Full Name: ${submission.fullName}`,
            `Work Email: ${submission.workEmail}`,
            `Organisation: ${submission.organisation || "N/A"}`,
            `Service Category: ${submission.serviceCategory}`,
            `Preferred Timeline: ${submission.preferredTimeline}`,
            ``,
            `Scope & Objectives:`,
            submission.projectDescription,
          ].join("\n"),
        }),
      });
      emailDispatched = res.ok;
    } catch {
      emailDispatched = false;
    }
  }

  return {
    webhookDispatched,
    emailDispatched,
  };
}
