import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["photo", "video"],
      required: true,
    },
    src: {
      type: String,
    },
    thumb: {
      type: String,
    },
    alt: {
      type: String,
    },
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    duration: {
      type: String,
    },
    youtubeId: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
