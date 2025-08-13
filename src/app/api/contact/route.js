// src/app/api/contact/route.js
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs"; // ensure Node runtime for Resend

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  propertyType: z.enum(["Residential", "Commercial"]).optional().nullable(),
  message: z.string().min(1).max(4000),
  company: z.string().optional().nullable(), // honeypot
});

console.log("RESEND_API_KEY loaded?", process.env.RESEND_API_KEY?.startsWith("re_"));
console.log("CONTACT_TO:", process.env.CONTACT_TO);
console.log("CONTACT_FROM:", process.env.CONTACT_FROM);

export async function POST(req) {
  try {
    const data = await req.json();
    const parsed = ContactSchema.safeParse(data);
    if (!parsed.success) {
      return Response.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const body = parsed.data;

    // Honeypot trap: if filled, pretend success
    if (body.company && body.company.trim() !== "") {
      return Response.json({ ok: true });
    }

    const to = process.env.CONTACT_TO || "info@basinbrightwindows.com";
    const from = process.env.CONTACT_FROM || "info@basinbrightwindows.com"; // your verified sender

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
        <h2 style="margin:0 0 12px;color:#0f172a">New Quote Request</h2>
        <p><strong>Name:</strong> ${esc(body.name)}</p>
        <p><strong>Email:</strong> ${esc(body.email)}</p>
        ${body.phone ? `<p><strong>Phone:</strong> ${esc(body.phone)}</p>` : ""}
        ${body.address ? `<p><strong>Address:</strong> ${esc(body.address)}</p>` : ""}
        ${body.propertyType ? `<p><strong>Property Type:</strong> ${esc(body.propertyType)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e5e7eb">${esc(body.message)}</pre>
      </div>
    `;

    await resend.emails.send({
        to,
        from: `Basin Bright Windows <${from}>`,   // friendly name
        replyTo: body.email,                      // replies go to the customer
        subject: `New quote request from ${body.name}`,
        html,                                     // your existing HTML
        text: [
          `New quote request`,
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          body.phone ? `Phone: ${body.phone}` : ``,
          body.address ? `Address: ${body.address}` : ``,
          body.propertyType ? `Property Type: ${body.propertyType}` : ``,
          ``,
          `Message:`,
          `${body.message}`
        ].filter(Boolean).join('\n')
      });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

function esc(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
