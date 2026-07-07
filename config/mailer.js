const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 20_000,
  greetingTimeout: 20_000,
  socketTimeout: 20_000,
});

// Avoid breaking app start if SMTP is unreachable at boot.
transporter.verify((err) => {
  if (err) {
    console.error("SMTP verify failed (will still try on send):", err.message);
  } else {
    console.log("SMTP Ready");
  }
});

module.exports = transporter;
