const outletRegisterValidator = (formData) => {
    const {name,address,phoneNo,email,pswd,cnfrmPswd} = formData;
    const nameRegex = /^[A-Za-z ]+$/;

    if(!name){
      return "Please enter the outlet name.";
    }
    if(!nameRegex.test(name)){
      return "Outlet name can only contain letters and spaces."
    }

    if(!address){
      return "Please enter the outlet address.";
    }
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    if(!addressRegex.test(address)){
      return "Please enter a valid address without special characters or symbols."
    }

    if(!phoneNo){
      return "Please enter outlet phone number.";
    }
  
    const phoneNoregex = /^\d{10}$/;
    if (!phoneNoregex.test(phoneNo)) {
      return "Phone number must be 10 digits long.";
    }

    if (!email) {
      return "Please enter outlet email address.";
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
  
    if (pswd !== cnfrmPswd) {
      return "Passwords do not match.";
    }
  
    // Return empty string if all inputs are valid
    return "";
  }

  export default outletRegisterValidator