const cusRegisterValidator = (formData) => {
    const { firstName, lastName, email, pswd, cnfrmPswd } = formData;

    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName) {
      return "Please enter your first name.";
    }
    if(!nameRegex.test(firstName)){
      return "Please enter a first name containing only english letters."
    }

    if (!lastName) {
      return "Please enter your last name.";
    }
    if(!nameRegex.test(lastName)){
      return "Please enter a last name containing only english letters."
    }

    if (!email) {
      return "Please enter your email address.";
    }
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
  
    if (!pswd) {
      return `Please enter a new password.`;
    }

    const pswdRegex = /^[a-zA-Z!@#$%^&*]{8,}$/;
    if(!pswdRegex.test(pswd)){
      return "Password must be at least 8 characters long and can only contain letters and symbols."
    }

    if (pswd.length < 8) {
      return "Password must be at least 8 characters long.";
    }
  
    if (pswd !== cnfrmPswd) {
      return "Passwords do not match.";
    }
  
    // Return empty string if all inputs are valid
    return "";
  }

  export default cusRegisterValidator