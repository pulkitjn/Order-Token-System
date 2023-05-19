import pkg from 'jsonwebtoken';
const { verify } = pkg;
import Customer from "../models/customerModel.js";

const customerTokenAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const secretKey = process.env.OTS_JWT_SECRET_KEY;
    verify(token, secretKey, async (err, emailDecoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      const existingCustomer = await Customer.findOne({email: emailDecoded})
      if(!existingCustomer){
        return res.status(404).json({error: "Not found"});
      }
      req.email = emailDecoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default customerTokenAuthenticate;
