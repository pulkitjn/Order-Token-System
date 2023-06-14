import { hash } from "bcrypt";

import Customer from "../../models/customerModel.js";

const customerRegister = async (req, res) => {
  try {
    // Extract the form data from the request body
    console.log('customerRegister called');
    const { firstName, lastName, email, password } = req.body;

    // validate the req.body
    const error = validateCustomer(req.body);
    if (Object.keys(error).length !== 0) {
      console.log(error);
      res.status(400).json({ error });
      return;
    }

    // Hash the password
    const hashedPassword = await hash(password,  parseInt(process.env.OTS_BCRYPT_SALT_ROUNDS,10));

    // Create a new Customer instance
    const customer = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the customer to the database
    await customer.save().then((res)=>{
      console.log(`Customer is saved \n${res}`);
    }).catch((err)=>{
      console.log(`Error Saving customer in DB: ${err}`);
      throw err;
    });

    // Return a success response
    res.status(201).json({ message: "Customer registered successfully." });
  } catch (error) {
    // Handle any errors that occurred during registration
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const validateCustomer = (data) => {
  const errors = {};

  if (
    !data.firstName ||
    typeof data.firstName !== "string" ||
    data.firstName.trim() === ""
  ) {
    errors.firstName = "Please enter your first name.";
  } else {
    const trimmedFirstName = data.firstName.trim();
    if (!/^[A-Za-z]+$/.test(trimmedFirstName)) {
      errors.firstName =
        "Please enter a first name containing only English letters.";
    }
  }

  if (
    !data.lastName ||
    typeof data.lastName !== "string" ||
    data.lastName.trim() === ""
  ) {
    errors.lastName = "Please enter your last name.";
  } else {
    const trimmedLastName = data.lastName.trim();
    if (!/^[A-Za-z]+$/.test(trimmedLastName)) {
      errors.lastName =
        "Please enter a last name containing only English letters.";
    }
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    data.email.trim() === ""
  ) {
    errors.email = "Please enter your email address.";
  } else {
    const trimmedEmail = data.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (
    !data.password ||
    typeof data.password !== "string" ||
    data.password.trim() === "" ||
    data.password.length < 8
  ) {
    errors.password =
      "Please enter a new password that is at least 8 characters long.";
  } else{
    const trimmedPassword = data.password.trim();
    if(!/^[a-zA-Z0-9!@#$%^&*]+$/.test(trimmedPassword)){
      errors.password = "Password can only contain letters A-Z or a-z, digits 0-9 and symbols !@#$%^&*]";
    }
  }

  if (
    !data.confirmPassword ||
    typeof data.confirmPassword !== "string" ||
    data.confirmPassword.trim() === "" ||
    data.confirmPassword !== data.password
  ) {
    errors.confirmPassword =
      "Confirmation password is required and must match the password field.";
  }
  return errors;
};


export default customerRegister;