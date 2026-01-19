import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import "dotenv/config";

const app = express();

/* ======================
   CORS (VERY IMPORTANT)
   ====================== */
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
      return cb(null, false); // don't throw
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// 🔥 REQUIRED for browser preflight
app.options("*", cors());

/* ====================== */

app.use(express.json());

// routes
app.use("/api/contact", contactRoute);

// health check
app.get("/", (req, res) => res.send("API is running"));

// start server (Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
