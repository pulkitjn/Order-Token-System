import { hash } from "bcrypt";

import Outlet from "../models/outletModel.js";

const outletRegister = async (req, res) => {
  try {
    // Extract the form data from the request body
    const { name, address, phoneNo, email, pswd} = req.body;

    // validate the req.body
    const error = validateOutlet(req.body);
    if (Object.keys(error).length !== 0) {
      console.log(error);
      res.status(400).json({ error });
      return;
    }

    // Hash the password
    const hashedPassword = await hash(pswd, parseInt(process.env.OTS_BCRYPT_SALT_ROUNDS,10));

    // Create a new Outlet instance
    const outlet = new Outlet({
      name,
      address,
      phoneNo,
      email,
      password: hashedPassword,
    });

    // Save the outlet to the database
    await outlet.save().then((res)=>{
      console.log(`Outlet is saved \n${res}`);
    }).catch((err)=>{
      console.log(`Error Saving outlet in DB: ${err}`);
      throw err;
    });

    // Return a success response
    res.status(201).json({ message: "Outlet registered successfully." });
  } catch (error) {
    // Handle any errors that occurred during registration
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const validateOutlet = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.name = "Outlet name is required.";
  } else {
    const trimmedName = data.name.trim();
    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      errors.name = "Outlet name can only contain letters and spaces.";
    }
  }

  if (
    !data.address ||
    typeof data.address !== "string" ||
    data.address.trim() === ""
  ) {
    errors.address = "Outlet address is required.";
  } else {
    const trimmedAddress = data.address.trim();
    if (!/^[a-zA-Z0-9\s,'-]*$/.test(trimmedAddress)) {
      errors.address =
        "Please enter a valid address without special characters or symbols.";
    }
  }

  if (
    !data.phoneNo ||
    typeof data.phoneNo !== "string" ||
    !/^\d{10}$/.test(data.phoneNo)
  ) {
    errors.phoneNo =
      "Outlet phone number is required and must be 10 digits long.";
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    data.email.trim() === ""
  ) {
    errors.email = "Outlet email address is required.";
  } else {
    const trimmedEmail = data.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  if (
    !data.pswd ||
    typeof data.pswd !== "string" ||
    data.pswd.trim() === "" ||
    data.pswd.length < 8
  ) {
    errors.password =
      "Password is required and must be at least 8 characters long.";
  }
  console.log(data.cnfrmPswd);
  console.log(data.pswd);
  if (
    !data.cnfrmPswd ||
    typeof data.cnfrmPswd !== "string" ||
    data.cnfrmPswd.trim() === "" ||
    data.cnfrmPswd !== data.pswd
  ) {
    errors.cnfrmPswd =
      "Confirmation password is required and must match the password field.";
  }

  return errors;
};


export default outletRegister