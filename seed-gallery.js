import mongoose from 'mongoose';

// Define Schema manually so we don't have to deal with Next.js path aliases in plain Node
const GallerySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["photo", "video"], required: true },
    src: { type: String },
    thumb: { type: String },
    alt: { type: String },
    label: { type: String },
    title: { type: String },
    duration: { type: String },
    youtubeId: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);

const photos = [
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", alt: "Bridal Makeup Look", label: "Bridal Makeup", order: 1 },
  { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80", alt: "Party Glam Makeup", label: "Party Glam", order: 2 },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", alt: "Bridal Jewelry Look", label: "Bridal Look", order: 3 },
  { src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80", alt: "Skin Care Treatment", label: "Glow Skin", order: 4 },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", alt: "Beauty Salon Interior", label: "Our Studio", order: 5 },
  { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80", alt: "Makeup Products", label: "Premium Products", order: 6 },
  { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80", alt: "Engagement Makeup", label: "Engagement Look", order: 7 },
  { src: "https://images.unsplash.com/photo-1595868846927-463d11b22295?w=600&q=80", alt: "Mehndi Function Look", label: "Mehndi Look", order: 8 },
  { src: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80", alt: "Traditional Bridal", label: "Traditional Bridal", order: 9 },
];

const videos = [
  { thumb: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=70", title: "Bridal Makeup Tutorial", duration: "8:24", youtubeId: "dQw4w9WgXcQ", order: 10 },
  { thumb: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=70", title: "Full Bridal Transformation", duration: "15:30", youtubeId: "dQw4w9WgXcQ", order: 11 },
  { thumb: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=70", title: "Party Makeup Look", duration: "6:15", youtubeId: "dQw4w9WgXcQ", order: 12 },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing
    await Gallery.deleteMany({});
    console.log("Cleared existing gallery items");

    // Insert photos
    const photoDocs = photos.map(p => ({ ...p, type: 'photo' }));
    await Gallery.insertMany(photoDocs);
    console.log(`Inserted ${photoDocs.length} photos`);

    // Insert videos
    const videoDocs = videos.map(v => ({ ...v, type: 'video' }));
    await Gallery.insertMany(videoDocs);
    console.log(`Inserted ${videoDocs.length} videos`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
