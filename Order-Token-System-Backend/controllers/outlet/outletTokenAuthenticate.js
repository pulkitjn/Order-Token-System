import pkg from "jsonwebtoken";
const { verify } = pkg;
import Outlet from "../../models/outletModel.js";

const outletTokenAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const payLoad = verify(accessToken, accessTokenSecret);
    const existingOutlet = await Outlet.findOne({ email: payLoad.outletEmail });
    if (!existingOutlet) {
      return res.status(404).json({ error: "Outlet not found" });
    }
    req.outletId = existingOutlet._id;
    next();
  } catch (error) {
    return res.status(403).json({ error });
  }
};

export default outletTokenAuthenticate;
