import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    transactions: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
