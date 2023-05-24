import { model, Schema } from "mongoose";

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  outletId: {
    type: Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);

export default Order;
