import pkg from "jsonwebtoken";
const { verify, sign } = pkg;
import Outlet from "../../models/outletModel.js";

const outletTokenRefresh = async (req, res) => {
  try {
    const { outletRefreshToken } = req.cookies;

    if (!outletRefreshToken) {
      return res.status(400).json({ error: "No refresh token sent" });
    }
    const refreshTokenSecret = process.env.REFRESH_JWT_SECRET;
    const payLoad = verify(outletRefreshToken, refreshTokenSecret);
    // Generate a new access token
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const newAccessToken = sign(
      { outletEmail: payLoad.outletEmail },
      accessTokenSecret,
      { expiresIn: "15m" }
    );
    return res.status(200).json({message: 'Access token refreshed', accessToken: newAccessToken})
  } catch (error) {
    console.log(error);
    return res.status(401).json({error:"Unauthorized" });
  }
};

export default outletTokenRefresh;
