// server.js
import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";
import "dotenv/config";

const app = express();

/* =========================
   CORS
   - Local dev: http://localhost:5173
   - Production: set FRONTEND_URL on Render (your deployed frontend URL)
========================= */
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173", "https://buildaragroup.ca","https://www.buildaragroup.ca",].filter(
  Boolean
);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allows Postman / server requests
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Buildara Group API is running ");
});

/* =========================
   START SERVER (Render needs PORT)
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
