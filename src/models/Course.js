import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this course."],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    features: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Published",
    },
    icon: {
      type: String,
    },
    tag: {
      type: String,
    },
    color: {
      type: String,
    },
    border: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
