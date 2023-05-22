import pkg from "jsonwebtoken";
const { verify } = pkg;
import Outlet from "../models/outletModel.js";

const outletTokenAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const secretKey = process.env.OTS_JWT_SECRET_KEY;
    const payLoad = verify(token, secretKey);
    const existingOutlet = await Outlet.findOne({ email: payLoad.outletEmail });
    if (!existingOutlet) {
      return res.status(404).json({ error: "Not found" });
    }
    req.body.outletEmail = payLoad.outletEmail;
    next();
  } catch (error) {
    return res.status(403).json({ error });
  }
};

export default outletTokenAuthenticate;
