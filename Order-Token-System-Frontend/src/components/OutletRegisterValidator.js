const outletRegisterValidator = (formData) => {
  const {name,address,phoneNumber,email,password,confirmPassword} = formData;
  const nameRegex = /^[A-Za-z ]+$/;
  const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
  const phoneNumberregex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-zA-Z!@#$%^&*]{8,}$/;
  const errors = {}
  if(!name){
    errors.name = "Please enter the outlet name.";
  }else if(!nameRegex.test(name)){
      errors.name = "Outlet name can only contain letters and spaces."
  }

  if(!address){
      errors.address =  "Please enter the outlet address.";
  }else if(!addressRegex.test(address)){
      errors.address = "Please enter a valid address without special characters or symbols."
  }

  if(!phoneNumber){
    errors.phoneNumber= "Please enter outlet phone number.";
  }else if (!phoneNumberregex.test(phoneNumber)) {
    errors.phoneNumber= "Phone number must be 10 digits long.";
  }

  if (!email) {
    errors.email= "Please enter outlet email address.";
  }else if (!emailRegex.test(email)) {
      errors.email= "Please enter a valid email address.";
  }

  if (!password) {
    errors.password= `Please enter a new password.`;
  }else if(!passwordRegex.test(password)){
    errors.password= "Password must be at least 8 characters long and can only contain letters and symbols."
  }

  if (password !== confirmPassword) {
    errors.confirmPassword= "Passwords do not match.";
  }

  // Return empty string if all inputs are valid
  return errors;
}

export default outletRegisterValidator