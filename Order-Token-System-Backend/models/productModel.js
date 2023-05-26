import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    outletId: {
      type: Schema.Types.ObjectId,
      ref: "Outlet",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^[A-Za-z ]+$/,
        "Outlet name can only contain letters and spaces.",
      ],
    },
    priceType: {
      type: String,
      enum: ["₹", "$"],
      required: true,
      message: "Please select a valid price type (₹ or $).",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number."],
    },
    description: {
      type: String,
      required: false,
      match: [
        /^[a-zA-Z0-9\s]+$/,
        "Description can only contain alphanumeric characters.",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
