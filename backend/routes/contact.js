import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/* -----------------------
   Helpers
------------------------ */
const escapeHtml = (str = "") =>
  String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalize = (v = "") => String(v || "").trim();

/* -----------------------
   Send Email via Resend
------------------------ */
async function sendEmail({ to, subject, html, replyTo }) {
  const { RESEND_API_KEY, FROM_EMAIL, BRAND_NAME } = process.env;

  if (!RESEND_API_KEY || !FROM_EMAIL) {
    throw new Error("Email not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${BRAND_NAME || "Buildara Group"} <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
      reply_to: replyTo ? [replyTo] : undefined,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend error: ${txt}`);
  }
}

/* -----------------------
   POST /api/contact
------------------------ */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, service, city, message, website } = req.body;

    // Honeypot
    if (website) return res.json({ ok: true });

    const name = normalize(fullName);
    const userEmail = normalize(email);

    if (!name || !userEmail) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const safeMsg = escapeHtml(normalize(message)).replace(/\n/g, "<br/>");
    const safePhone = escapeHtml(phone || "N/A");
    const safeCity = escapeHtml(city || "N/A");
    const safeService = escapeHtml(service || "N/A");

    // 1) Email to Admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Request: ${name}`,
      replyTo: userEmail,
      html: `
        <h2>New Contact Form</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(userEmail)}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Service:</b> ${safeService}</p>
        <p><b>City:</b> ${safeCity}</p>
        <p><b>Message:</b><br/>${safeMsg}</p>
      `,
    });

    // 2) Auto-reply to user
    await sendEmail({
      to: userEmail,
      subject: "We received your request",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for contacting <b>Buildara Group</b>.</p>
        <p>We received your request and will contact you within 48 business hours.</p>
        <p>— Buildara Group</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
