const express = require("express");
const Contact = require("../models/Contact");
const { Resend } = require("resend");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);



router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    await contact.save();
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: "New enquiry from portfolio",
      html: `Name: ${contact.name}<br>Email: ${contact.email}<br>Subject: ${contact.subject}<br>Message: ${contact.message}`,
    });
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
