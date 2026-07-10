const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile.routes");
const programCompletionRoutes = require("./routes/programCompletion.routes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/program-completions", programCompletionRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Alumni Tracker API is running.");
});

module.exports = app;
