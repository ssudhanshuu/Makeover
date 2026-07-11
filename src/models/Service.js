import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this service."],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category for this service."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please specify the price of the service."],
      min: [0, "Price cannot be less than 0."],
    },
    unit: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
