const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRoutes = require("./routes/contactsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://mythosone.github.io/"]
    : ["http://localhost:3000"];

// Middleware
app.use(logger(formatLogger));
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", /*"PUT",*/ "DELETE"],
  })
);

// API routes
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", authRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const {
    status = err.status || 500,
    message = err.message || "Server error",
  } = err;
  res.status(status).json({ message });
});

module.exports = app;
