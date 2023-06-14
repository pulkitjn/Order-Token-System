const CusOTPValidator = (formData) => {
  const { otp } = formData;
  const errors = {};

  if (!otp) {
    errors.otp = "OTP is required.";
  } else if (!/^\d{6}$/.test(otp)) {
    errors.otp = "OTP must be a 6-digit number.";
  }

  return errors;
};

export default CusOTPValidator;
