import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Basic escaping to prevent HTML injection in email body
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Extra safety: ensure these cannot break headers
function cleanHeaderValue(str = "") {
  return String(str).replace(/[\r\n]/g, " ").trim();
}

router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, service, city, message, website } = req.body;

    // Honeypot (optional): add a hidden input named "website" in your form.
    // If it's filled, it's probably a bot.
    if (website) return res.status(200).json({ ok: true });

    if (!email || !fullName) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    // Minimal email format check
    const emailTrim = String(email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Required env checks
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

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({ error: "Email server is not configured." });
    }
    if (!ADMIN_EMAIL || !FROM_EMAIL) {
      return res.status(500).json({ error: "Missing ADMIN_EMAIL or FROM_EMAIL." });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Verify transporter (catches bad creds/config early)
    await transporter.verify();

    const safeName = cleanHeaderValue(fullName);
    const safeReplyTo = cleanHeaderValue(emailTrim);

    const safePhone = escapeHtml(phone || "N/A");
    const safeService = escapeHtml(service || "N/A");
    const safeCity = escapeHtml(city || "N/A");
    const safeMessage = escapeHtml(message || "").replace(/\n/g, "<br/>");

    // 1) Email to Admin
    await transporter.sendMail({
      from: `"Website Contact" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact Request: ${safeName}`,
      replyTo: safeReplyTo,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(fullName)}</p>
        <p><b>Email:</b> ${escapeHtml(emailTrim)}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Service:</b> ${safeService}</p>
        <p><b>City:</b> ${safeCity}</p>
        <p><b>Message:</b><br/>${safeMessage || "N/A"}</p>
      `,
    });

    // 2) Auto-reply to User
    await transporter.sendMail({
      from: `"${cleanHeaderValue(BRAND_NAME || "Our Team")}" <${FROM_EMAIL}>`,
      to: emailTrim,
      subject: "We received your request",
      html: `
        <p>Hi ${escapeHtml(fullName)},</p>
        <p>Thanks for reaching out to Buildara Group. We’ve received your request and will contact you shortly.</p>
        <p><b>Your details:</b></p>
        <ul>
          <li>Service: ${safeService}</li>
          <li>City: ${safeCity}</li>
          <li>Phone: ${safePhone}</li>
        </ul>
        <p>— ${escapeHtml(BRAND_NAME || "Our Team")}</p>
      `,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
