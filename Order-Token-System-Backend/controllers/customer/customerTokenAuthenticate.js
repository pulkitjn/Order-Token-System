import pkg from "jsonwebtoken";
const { verify } = pkg;
import Customer from "../../models/customerModel.js";

const customerTokenAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const accessTokenSecret = process.env.ACCESS_JWT_SECRET;
    const payLoad = verify(accessToken, accessTokenSecret);
    let existingCustomer = await Customer.findOne({ email: payLoad.customerEmail });
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    req.customerId = existingCustomer._id;
    next();
  } catch (error) {
    return res.status(403).json({ error });
  }
};

export default customerTokenAuthenticate;
