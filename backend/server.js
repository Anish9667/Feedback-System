const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Feedback System API Running ✅");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
  });

}).catch((err) => {
  console.error("MongoDB Connection Failed ❌", err);
});
