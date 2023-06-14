import { compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import Outlet from "../../models/outletModel.js";

const outletLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingOutlet = await Outlet.findOne({ email: email });

    if (!existingOutlet) {
      res.status(404).json({ error: "Email not registered with us" });
      return;
    }

    const passwordFromDB = existingOutlet.toObject().password;
    console.log(`Hashed password from db is ${passwordFromDB} and put in password is ${password}`);
    const isMatch = compare(password, passwordFromDB);
    if (!isMatch) {
      res.status(400).json({ error: "Incorrect Password !!" });
      return;
    }


    const refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
    const refreshToken = sign({outletEmail: email}, refreshTokenSecret, {
      expiresIn: "1d",
    });
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const accessToken = sign({outletEmail: email}, accessTokenSecret, {
      expiresIn: "15m",
    });
    const cookieName = "outletRefreshToken";

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    res.cookie(cookieName, refreshToken, {
      expires: expirationDate,
      httpOnly: true,
      sameSite: "strict"
    }); 

    // const cookieOptions =
    //   `HttpOnly; Path=/; SameSite=Strict; Expires=${expirationDate.toUTCString()}`;
    // const refreshTokenCookie = `${cookieName}=${refreshToken}${cookieOptions}`;
    // res.setHeader("Set-Cookie", refreshTokenCookie);
    res.status(200).json({ message: "You are in!", accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export default outletLogin;
