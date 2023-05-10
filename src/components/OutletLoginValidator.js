const OutletLoginValidator = (formData) =>{
    const {email,pswd} = formData;

    if (!email) {
        return "Please enter your registered outlet email address.";
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if(!pswd) {
        return "Please enter password.";
    }
    return "";
}

export default OutletLoginValidator