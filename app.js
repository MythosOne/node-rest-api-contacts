const express = require("express");
const morgan = require("morgan");
const contactsRouter = require("./routes/contactsRouter");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// API routes
app.use("/api/contacts", contactsRouter);

module.exports = app;
