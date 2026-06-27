import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import errorHandler from "./middlewares/error.middleware.js";
import companyRoutes from "./routes/company.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

/**
 * 🔒 Security Headers (Helmet)
 * Problem: Browsers are vulnerable to attacks like clickjacking, MIME sniffing, XSS.
 * Solution: Helmet sets secure HTTP headers automatically.
 */
app.use(helmet());

/**
 * 🔒 Hide Tech Stack
 * Problem: Express exposes "X-Powered-By: Express" → attackers know your backend tech.
 * Solution: Disable it to reduce attack surface.
 */
app.disable("x-powered-by");

/**
 * 🚦 Rate Limiting (Anti-Abuse)
 * Problem: Bots or attackers can spam API (DDoS / brute-force attacks).
 * Solution: Limit number of requests per IP (100 requests per minute).
 */
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 100, // max 100 requests per IP
  }),
);

/**
 * 📦 JSON Body Parser
 * Problem: Incoming request body is raw → req.body is undefined.
 * Solution: Parse JSON body into usable JS object.
 */
// app.use(express.json({ limit: "100kb" }));

/**
 * 🌐 CORS (Cross-Origin Resource Sharing)
 * Problem: Browser blocks requests from different origin (frontend ↔ backend).
 * Solution: Allow requests only from trusted frontend (localhost:5173).
 */
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

/**
 * 📂 Static File Serving
 * Problem: Uploaded files saved on disk are not accessible via browser.
 * Solution: Expose uploads folder publicly through HTTP.
 */
app.use("/uploads", express.static("upload"));

/**
 * 🛣️ Routes
 * Problem: Need modular, scalable routing instead of putting everything in one file.
 * Solution: Mount auth routes under /auth
 */
app.use("/company", companyRoutes);
app.use("/user", userRoutes);

/**
 * ❤️ Health Check Route
 * Problem: Hard to know if server is running or reachable.
 * Solution: Simple endpoint to verify API is alive.
 */
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

/**
 * ❌ 404 Handler (Route Not Found)
 * Problem: Unknown routes return nothing or hang request.
 * Solution: Catch all unmatched routes and forward as error.
 */
app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  next(err);
});

/**
 * ⚠️ Global Error Handler
 * Problem: Errors scattered across app → inconsistent responses + crashes.
 * Solution: Centralized error handling for all errors.
 */
app.use(errorHandler);

export default app;
