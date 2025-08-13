import { Resend } from "resend";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name = "Anonymous", rating = 5, text = "" } = await req.json();

    await resend.emails.send({
      to: process.env.CONTACT_TO || "info@basinbrightwindows.com",
      from: `Basin Bright Windows <${process.env.CONTACT_FROM || "no-reply@basinbrightwindows.com"}>`,
      subject: `New website review from ${name} (${rating}★)`,
      text: `Name: ${name}\nRating: ${rating}\n\n${text}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
          <h2>New Website Review</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Rating:</strong> ${rating} / 5</p>
          <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e5e7eb">${esc(text)}</pre>
        </div>`,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
function esc(s = "") {
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
