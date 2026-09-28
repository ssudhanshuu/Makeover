import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number."],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    // For booking
    service: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    requests: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Contact", "Booking"],
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Converted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
