import Customer from "../models/customerModel.js";
import OrderItem from "../models/orderItemModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import generateUniqueToken from "./generateUniqueToken.js";

const addOrder = async (req, res) => {
  try {
    const { customerEmail, orderItems } = req.body;
    const outletId = req.outletId;
    console.log(orderItems);
    console.log(customerEmail);
    // Validating customer email
    const customerFindResult = await Customer.findOne({ email:customerEmail });
    if (!customerFindResult) {
      console.log(`Customer with email ${customerEmail} not found`);
      return res
        .status(404)
        .json({ message: `Customer with email ${customerEmail} not found` });
    }
    const customerId = customerFindResult._id;

    // Validating order Items
    for (const item of orderItems) {
      const { productId, quantity } = item;
      if (!Number.isInteger(quantity)) {
        console.log(`Quantity ${quantity} is not an integer`);
        return res
          .status(400)
          .json({ error: `Quantity ${quantity} is not an integer` });
      }
      const product = await Product.findById(productId);
      if (!product) {
        console.log(`Product with ID ${productId} not found`);
        return res
          .status(404)
          .json({ error: `Product with ID ${productId} not found`});
      }
      if (!product.outletId.equals(outletId)) {
        console.log(`The selected item with ID ${productId} does not belong to the outlet.`);
        return res
          .status(404)
          .json({ error: `The selected item with ID ${productId} does not belong to the outlet.`});
      }
    }

    // Saving the order
    const order = new Order({ customerId, outletId });
    const savedOrder = await order.save();

    // Saving the order Items
    const createdOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const { productId, quantity } = item;
        const orderItem = new OrderItem({
          orderId: savedOrder._id,
          token: generateUniqueToken(),
          productId,
          quantity,
        });
        return await orderItem.save();
      })
    );

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export default {addOrder};
