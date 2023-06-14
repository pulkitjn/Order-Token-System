import Customer from "../../models/customerModel.js";
import Otp from "../../models/otpModel.js";
import generateOTP from "../utils/generateOtp.js";

const customerRegisterEmailOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      console.log(`${email} is already regsitered`);
      return res.status(400).json({ error: "Email already registered" });
    }

    // Generate OTP
    const otp = generateOTP();
    console.log(`Otp is ${otp}`);
    // Set expiration date (e.g., 10 minutes from now)
    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    // Check if the email is already registered
    const existingEmailOtp = await Otp.findOne({ email });
    // Create a new OTP document
    if (!existingEmailOtp) {
      const newOtp = new Otp({
        email,
        otp,
        expiration,
      });

      // Save the OTP document to the database
      await newOtp
        .save()
        .then(() => {
          console.log("New Otp saved successfully");
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } else {
      await Otp.updateOne(
        { email: email },
        { otp: otp, expiration: expiration }
      )
        .then(() => {
          console.log("Otp updated successfully");
        })
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }
    req.otp = otp;
    next();
  } catch (error) {
    console.error("Error registering user otp: ", error);
    res.status(500).json({ error: "Error registering user otp" });
  }
};

export default customerRegisterEmailOtp;
