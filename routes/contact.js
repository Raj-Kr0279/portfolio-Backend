const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const transporter = require("../config/mailer");

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.save();
    console.log("Saved.");

console.log("Sending email...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself
      subject: `New enquiry from ${contact.name}`,
      text: `Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}
Message: ${contact.message}`
    });
    console.log("Email sent:", info);
    res.json({
      success: true,
      message: "Message received!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;