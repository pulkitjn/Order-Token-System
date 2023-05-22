import { createTransport } from "nodemailer";

// Function to send the OTP to the user's email
const sendEmailOTP = (req, res) => {
  // Create a Nodemailer transporter for sending emails
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.OTS_MAIL_TRAP_USER,
      pass: process.env.OTS_MAIL_TRAP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.OTS_SENDER_EMAIL,
    to: req.body.email,
    subject: "OTP Verification",
    text: `Your OTP: ${req.otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP email:", error);
      res.status(500).json({ error: "Error sending Otp" });
    } else {
      console.log("OTP email sent:", info.response);
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
};

export default sendEmailOTP;
