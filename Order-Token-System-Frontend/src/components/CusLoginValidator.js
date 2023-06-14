const CusLoginValidator = (formData) => {
    const { email, password } = formData;
    const errors = {};
  
    if (!email) {
      errors.email = "Please enter your registered email address.";
    } else {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address.";
      }
    }
  
    if (!password) {
      errors.password = "Please enter password.";
    }
  
    return errors;
  };
  
  export default CusLoginValidator;
  