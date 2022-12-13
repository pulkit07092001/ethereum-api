import mongoose from "mongoose";
const EthereumSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ethereum", EthereumSchema);
