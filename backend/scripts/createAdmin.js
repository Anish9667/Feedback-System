const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin1234", 10);

    const admin = new Admin({
      email: "anish@gmil.com",
      password: hashedPassword
    });

    await admin.save();
    console.log("Admin Created ");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
