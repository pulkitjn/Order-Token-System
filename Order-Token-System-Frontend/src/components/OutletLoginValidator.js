const OutletLoginValidator = (formData) => {
  const { email, password } = formData;
  const errors = {};

  if (!email) {
    errors.email = "Please enter your registered outlet email address.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

export default OutletLoginValidator;
