const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // env variables load karne ke liye

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON body read karne ke liye

// Sample route
app.get("/", (req, res) => {
  res.send("Feedback System API Running ✅");
});

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected ✅");

  // Server start
  app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
  });

}).catch((err) => {
  console.error("MongoDB Connection Failed ❌", err);
});
