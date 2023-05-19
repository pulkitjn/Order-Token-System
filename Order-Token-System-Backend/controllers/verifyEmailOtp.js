import Otp from "../models/otpModel.js";

const verifyEmailOtp = async (req, res, next) => {
    const { email, otp } = req.body;
  
    try {
      // Find the OTP document for the given email
      const otpDocument = await Otp.findOne({ email });
  
      // Check if the OTP document exists
      if (!otpDocument) {
        return res.status(400).json({ error: 'Invalid email' });
      }
  
      // Check if the provided OTP matches the stored OTP
      if (otpDocument.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      // Check if the expiration date has passed
      if (otpDocument.expiration < Date.now()) {
        return res.status(400).json({ error: 'OTP has expired' });
      }

      // Now this otp is not needed so delete it
      await Otp.deleteOne({ email: email })
        .then(()=>{console.log('Document deleted successfully.');})
      
      console.log('OTP verification successful');
      next();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export default verifyEmailOtp;
  