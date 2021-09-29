const express = require("express");
const users = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1", users);

module.exports = app;
