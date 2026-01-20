// backend/routes/contact.js
import express from "express";

const router = express.Router();

/* -----------------------
   Helpers
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

function isSkipEmail() {
  return String(process.env.SKIP_EMAIL || "").toLowerCase().trim() === "true";
}

/* -----------------------
   Mailgun API sender (NO form-data)
------------------------ */
async function sendMailgun({ to, subject, html, replyTo }) {
  const {
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    MAILGUN_REGION = "us",
    FROM_EMAIL,
    BRAND_NAME,
  } = process.env;

  const missing = [];
  if (!MAILGUN_API_KEY) missing.push("MAILGUN_API_KEY");
  if (!MAILGUN_DOMAIN) missing.push("MAILGUN_DOMAIN");
  if (!FROM_EMAIL) missing.push("FROM_EMAIL");
  if (missing.length) throw new Error(`Mailgun not configured (${missing.join(", ")})`);

  const apiBase =
    MAILGUN_REGION.toLowerCase() === "eu"
      ? "https://api.eu.mailgun.net"
      : "https://api.mailgun.net";

  const fromName = cleanHeaderValue(BRAND_NAME || "Buildara Group");

  // Mailgun accepts x-www-form-urlencoded
  const params = new URLSearchParams();
  params.set("from", `"${fromName}" <${FROM_EMAIL}>`);
  params.set("to", to);
  params.set("subject", subject);
  params.set("html", html);
  if (replyTo) params.set("h:Reply-To", cleanHeaderValue(replyTo));

  const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

  const resp = await fetch(`${apiBase}/v3/${MAILGUN_DOMAIN}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const text = await resp.text();
  if (!resp.ok) throw new Error(`Mailgun error (${resp.status}): ${text}`);
  return text;
}

/* -----------------------
   POST /api/contact
------------------------ */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, service, city, message, website } = req.body || {};

    // Honeypot
    if (website) return res.status(200).json({ ok: true });

    // Skip sending if enabled
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
      return res.status(400).json({ error: "Full name and email are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const safePhone = escapeHtml(normalize(phone) || "N/A");
    const safeService = escapeHtml(normalize(service) || "N/A");
    const safeCity = escapeHtml(normalize(city) || "N/A");
    const safeMessage = escapeHtml(normalize(message) || "N/A").replace(/\n/g, "<br/>");

    const { ADMIN_EMAIL, BRAND_NAME } = process.env;
    if (!ADMIN_EMAIL) return res.status(500).json({ error: "ADMIN_EMAIL is not configured." });

    const safeNameHeader = cleanHeaderValue(name);
    const safeFromName = cleanHeaderValue(BRAND_NAME || "Buildara Group");

    // 1) Email to Admin
    await sendMailgun({
      to: ADMIN_EMAIL,
      subject: `New Contact Request: ${safeNameHeader}`,
      replyTo: userEmail,
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

    // 2) Auto-reply to User
    await sendMailgun({
      to: userEmail,
      subject: "We received your request",
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to ${escapeHtml(safeFromName)}. We’ve received your request and will contact you within 48 business hours.</p>
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
    console.error("Contact email send error:", err?.message || err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
