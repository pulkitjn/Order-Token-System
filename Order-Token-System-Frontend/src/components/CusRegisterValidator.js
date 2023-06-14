const cusRegisterValidator = (formData) => {
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const errors = {};

  const nameRegex = /^[A-Za-z]+$/;
  if (!firstName) {
    errors.firstName = "Please enter your first name.";
  } else if (!nameRegex.test(firstName)) {
    errors.firstName = "Please enter a first name containing only English letters.";
  }

  if (!lastName) {
    errors.lastName = "Please enter your last name.";
  } else if (!nameRegex.test(lastName)) {
    errors.lastName = "Please enter a last name containing only English letters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (!password) {
    errors.password = "Please enter a new password.";
  } else {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Password can only contain letters A-Z or a-z, digits 0-9 and symbols !@#$%^&*]";
    } 
  }

  if (password !== confirmPassword) { 
    errors.confirmPassword = "Confirmation password is required and must match the password field.";
  }

  return errors;
};

export default cusRegisterValidator;
