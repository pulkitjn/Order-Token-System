import { compare } from "bcrypt";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import Customer from "../models/customerModel.js";

const customerLogin = async (req, res) => {
  try {
    const { email, pswd } = req.body;
    const existingCustomer = await Customer.findOne({ email: email });

    if (!existingCustomer) {
      res.status(401).json({ error: "Email is not registered" });
      return;
    }

    const password = existingCustomer.toObject().password;
    console.log(`Hashed password from db is ${password} and put in password is ${pswd}`);
    const isMatch = await compare(pswd, password);
    if (!isMatch) {
      res.status(401).json({ error: "Password is incorrect" });
      return;
    }

    const secretKey = process.env.OTS_JWT_SECRET_KEY;
    const token = sign({ customerEmail: email }, secretKey, {
      expiresIn: "30d", // Token expiration time
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export default customerLogin;
