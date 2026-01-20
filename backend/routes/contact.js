import express from "express";

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

const clean = (v = "") => String(v).trim();

/* -----------------------
   Resend sender
------------------------ */
async function sendEmail({ to, subject, html, replyTo }) {
  const { RESEND_API_KEY, FROM_EMAIL, BRAND_NAME } = process.env;

  if (!RESEND_API_KEY || !FROM_EMAIL) {
    throw new Error("Resend not configured");
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
    throw new Error(await res.text());
  }
}

/* -----------------------
   POST /api/contact
------------------------ */
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      service,
      city,
      message,
      website, // honeypot
    } = req.body || {};

    // Bot trap
    if (website) return res.json({ ok: true });

    const name = clean(fullName);
    const userEmail = clean(email);

    if (!name || !userEmail) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const { ADMIN_EMAIL } = process.env;
    if (!ADMIN_EMAIL) {
      return res.status(500).json({ error: "ADMIN_EMAIL missing" });
    }

    const safeMessage = escapeHtml(message || "N/A").replace(/\n/g, "<br/>");

    /* 1️⃣ Email to admin */
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Contact Request — ${name}`,
      replyTo: userEmail,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(userEmail)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone || "N/A")}</p>
        <p><b>Service:</b> ${escapeHtml(service || "N/A")}</p>
        <p><b>City:</b> ${escapeHtml(city || "N/A")}</p>
        <p><b>Message:</b><br/>${safeMessage}</p>
      `,
    });

    /* 2️⃣ Confirmation to user */
    await sendEmail({
      to: userEmail,
      subject: "We received your request",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for contacting <b>Buildara Group</b>.</p>
        <p>We received your request and will contact you shortly.</p>
        <p>— Buildara Group</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;

