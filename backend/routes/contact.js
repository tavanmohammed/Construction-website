// backend/routes/contact.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

/* -----------------------
   Helpers (safe email body)
------------------------ */
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanHeaderValue(str = "") {
  return String(str).replace(/[\r\n]/g, " ").trim();
}

function normalize(str = "") {
  return String(str ?? "").trim();
}

/* -----------------------
   POST /api/contact
------------------------ */
router.post("/", async (req, res) => {
  // Always respond; never hang
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

    // Honeypot: if filled, treat as bot and "succeed"
    if (website) return res.status(200).json({ ok: true });
     //  TEMP: don't send emails (Render can't reach GoDaddy SMTP)
if (isSkipEmail()) {
  console.log("CONTACT SUBMISSION (SKIP_EMAIL):", {
    time: new Date().toISOString(),
    fullName,
    email,
    phone,
    service,
    city,
    message,
  });
  return res.status(200).json({ ok: true });
}


    const name = normalize(fullName);
    const userEmail = normalize(email);

    if (!name || !userEmail) {
      return res
        .status(400)
        .json({ error: "Full name and email are required." });
    }

    // Minimal email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const safePhone = escapeHtml(normalize(phone) || "N/A");
    const safeService = escapeHtml(normalize(service) || "N/A");
    const safeCity = escapeHtml(normalize(city) || "N/A");
    const safeMessage = escapeHtml(normalize(message) || "N/A").replace(
      /\n/g,
      "<br/>"
    );

    // Env vars
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      ADMIN_EMAIL,
      FROM_EMAIL,
      BRAND_NAME,
    } = process.env;

    // Fail fast (don’t hang)
    const missing = [];
    if (!SMTP_HOST) missing.push("SMTP_HOST");
    if (!SMTP_PORT) missing.push("SMTP_PORT");
    if (!SMTP_USER) missing.push("SMTP_USER");
    if (!SMTP_PASS) missing.push("SMTP_PASS");
    if (!ADMIN_EMAIL) missing.push("ADMIN_EMAIL");
    if (!FROM_EMAIL) missing.push("FROM_EMAIL");

    if (missing.length) {
      return res.status(500).json({
        error: `Email server is not configured (${missing.join(", ")}).`,
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE).toLowerCase() === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },

      //  prevents infinite “Sending…”
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const safeFromName = cleanHeaderValue(BRAND_NAME || "Buildara Group");
    const safeReplyTo = cleanHeaderValue(userEmail);
    const safeNameHeader = cleanHeaderValue(name);

    // 1) Email to Admin
    await transporter.sendMail({
      from: `"Website Contact" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact Request: ${safeNameHeader}`,
      replyTo: safeReplyTo,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(userEmail)}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Service:</b> ${safeService}</p>
        <p><b>City:</b> ${safeCity}</p>
        <p><b>Message:</b><br/>${safeMessage}</p>
      `,
    });

    // 2) Auto-reply to User (optional, but nice)
    await transporter.sendMail({
      from: `"${safeFromName}" <${FROM_EMAIL}>`,
      to: userEmail,
      subject: "We received your request",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to Buildara Group. We’ve received your request and will contact you within 48 business hours.</p>
        <p><b>Your details:</b></p>
        <ul>
          <li>Service: ${safeService}</li>
          <li>City: ${safeCity}</li>
          <li>Phone: ${safePhone}</li>
        </ul>
        <p>— ${escapeHtml(safeFromName)}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact email send error:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
