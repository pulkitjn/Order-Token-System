import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    validate: {
      validator: async function (productId) {
        try {
            const product = await model("Product").findById(productId);
            if (!product) {
              return false;
            }
            const order = await model("Order").findById(this.orderId);
            return product.outletId.equals(order.outletId);
          } catch (error) {
            return false;
          }
      },
      message: function () {
        return `The selected item does not belong to the outlet.`;
      },
    },
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Quantity must be an integer.",
    },
    min: [1, "Quantity must be a positive integer"]
  },
  status: {
    type: String,
    enum: {
      values: ["In Queue", "In Process", "Prepared", "Completed"],
      message: "Invalid status value.",
    },
    default: "In Queue",
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
});

const OrderItem = model("OrderItem", orderItemSchema);

export default OrderItem
