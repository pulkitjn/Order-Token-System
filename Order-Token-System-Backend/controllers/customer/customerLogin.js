import { compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

import Customer from "../../models/customerModel.js";

const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingCustomer = await Customer.findOne({ email: email });

    if (!existingCustomer) {
      res.status(404).json({ error: "Email is not registered" });
      return;
    }

    const passwordFromDB = existingCustomer.toObject().password;
    console.log(
      `Hashed password from db is ${passwordFromDB} and put in password is ${password}`
    );
    const isMatch = compare(password, passwordFromDB);
    if (!isMatch) {
      res.status(400).json({ error: "Incorrect Password !!" });
      return;
    }

    const refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
    const refreshToken = sign({ customerEmail: email }, refreshTokenSecret, {
      expiresIn: "30d",
    });
    console.log(refreshToken);
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const accessToken = sign({ customerEmail: email }, accessTokenSecret, {
      expiresIn: "1h",
    });
    const cookieName = "customerRefreshToken";

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    res.cookie(cookieName, refreshToken, {
      expires: expirationDate,
      httpOnly: true,
      sameSite: "strict"
    });
    // const cookieOptions = `HttpOnly; Path=/; SameSite=Strict; Expires=${expirationDate.toUTCString()}`;
    // const refreshTokenCookie = `${cookieName}=${refreshToken} ${cookieOptions}`;
    // res.setHeader("Set-Cookie", refreshTokenCookie);
    res.status(200).json({ message: "You are in!", accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export default customerLogin;
