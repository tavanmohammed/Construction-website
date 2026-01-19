// backend/server.js
import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import "dotenv/config";

const app = express();

/* ======================
   CORS (production-safe)
   ====================== */
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g. https://www.buildaragroup.ca
  "http://localhost:5173",
  "https://buildaragroup.ca",
  "https://www.buildaragroup.ca",
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    // allow server-to-server / curl requests with no Origin header
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) return cb(null, true);

    // block everything else
    return cb(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));


app.options(/.*/, cors(corsOptions));

/* ====================== */

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);

// Health check
app.get("/", (req, res) => res.status(200).send("API is running"));

// Start (Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

