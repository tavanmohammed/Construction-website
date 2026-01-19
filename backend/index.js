import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import "dotenv/config";

const app = express();

/* =========================
   CORS — MUST be first
   ========================= */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://buildaragroup.ca",
  "https://www.buildaragroup.ca",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// 👇 REQUIRED for preflight
app.options("*", cors());

/* ========================= */

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);

// Health check
app.get("/", (req, res) => res.send("API is running"));

// Render PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));

