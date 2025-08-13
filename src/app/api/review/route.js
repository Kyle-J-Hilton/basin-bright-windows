// src/app/api/review/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // don't prerender; run at request time

// Lazy init so builds don't crash if env isn't present at build-time
let resend;
function getResend() {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is missing");
    resend = new Resend(key);
  }
  return resend;
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const name = (payload?.name || "Anonymous").toString().slice(0, 120);
    // coerce rating to 1–5
    let rating = Number(payload?.rating ?? 5);
    if (!Number.isFinite(rating)) rating = 5;
    rating = Math.min(5, Math.max(1, Math.round(rating)));
    const text = (payload?.text || "").toString().slice(0, 4000);

    const to = process.env.CONTACT_TO || "info@basinbrightwindows.com";
    const from = process.env.CONTACT_FROM || "no-reply@basinbrightwindows.com"; // must be verified in Resend

    await getResend().emails.send({
      to,
      from,
      subject: `New website review from ${name} (${rating}★)`,
      text: `Name: ${name}\nRating: ${rating}\n\n${text}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
          <h2 style="margin:0 0 12px;color:#0f172a">New Website Review</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Rating:</strong> ${rating} / 5</p>
          <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e5e7eb">${esc(text)}</pre>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Review API error:", e);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
