import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import Customer from "../../models/customerModel.js";

const customerTokenRefresh = async (req, res) => {
  try {
    const { customerRefreshToken } = req.cookies;
    console.log(customerRefreshToken);
    if (!customerRefreshToken) {
      return res.status(400).json({ error: "No refresh token sent, need to login again" });
    }
    console.log(customerRefreshToken);
    const refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
    const payLoad = verify(customerRefreshToken, refreshTokenSecret);

    // Generate a new access token
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const newAccessToken = sign(
      { customerEmail: payLoad.customerEmail },
      accessTokenSecret,
      { expiresIn: "1h" }
    );
    return res.status(200).json({message: 'Access token refreshed', accessToken: newAccessToken})
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export default customerTokenRefresh;
