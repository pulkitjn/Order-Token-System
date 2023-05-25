import pkg from "jsonwebtoken";
const { verify } = pkg;
import Customer from "../../models/customerModel.js";

const customerTokenAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const secretKey = process.env.OTS_JWT_SECRET_KEY;
    const payLoad = verify(token, secretKey);
    let existingCustomer = await Customer.findOne({ email: payLoad.customerEmail });
    if (!existingCustomer) {
      return res.status(404).json({ error: "Not found" });
    }
    req.customerId = existingCustomer._id;
    next();
  } catch (error) {
    return res.status(403).json({ error });
  }
};

export default customerTokenAuthenticate;
