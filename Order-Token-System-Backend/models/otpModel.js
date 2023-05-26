import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        `Please enter a valid email address.`,
      ],
    },
    otp: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{6}$/, "Please enter a 6 digit otp"],
    },
    expiration: {
      type: Date,
      required: true,
      default: Date.now + 15 * 60 * 1000,
      index: { expires: "15m" },
    },
  },
  {
    timestamps: true,
  }
);

const Otp = model("Otp", otpSchema);

export default Otp;
