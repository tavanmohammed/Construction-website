import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import "dotenv/config";

const app = express();

// Allow local + production frontend
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173", "https://buildaragroup.ca","https://www.buildaragroup.ca", ].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow no-origin requests
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// API route
app.use("/api/contact", contactRoute);

// Health check
app.get("/", (req, res) => res.send("API is running"));

// Render uses process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
