const express = require("express");
const morgan = require("morgan");
const contactsRouter = require("./routes/contactsRouter");

const app = express();

app.use("/api/contacts", contactsRouter);
app.use(morgan("dev"));
app.use(express.json());

module.exports = app;
