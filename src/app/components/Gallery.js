"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye, Play } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    alt: "Bridal Makeup Look",
    label: "Bridal Makeup",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519415510236-718bcea615f4?w=600&q=80",
    alt: "Party Glam Makeup",
    label: "Party Glam",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    alt: "Bridal Jewelry Look",
    label: "Bridal Look",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80",
    alt: "Skin Care Treatment",
    label: "Glow Skin",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    alt: "Beauty Salon Interior",
    label: "Our Studio",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    alt: "Makeup Products",
    label: "Premium Products",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
    alt: "Engagement Makeup",
    label: "Engagement Look",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1583241800698-e8ab01830a66?w=600&q=80",
    alt: "Mehndi Function Look",
    label: "Mehndi Look",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80",
    alt: "Traditional Bridal",
    label: "Traditional Bridal",
  },
];

const videos = [
  {
    id: 1,
    thumb: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=70",
    title: "Bridal Makeup Tutorial",
    duration: "8:24",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    thumb: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=70",
    title: "Full Bridal Transformation",
    duration: "15:30",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    thumb: "https://images.unsplash.com/photo-1519415510236-718bcea615f4?w=500&q=70",
    title: "Party Makeup Look",
    duration: "6:15",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function Gallery() {
  const [tab, setTab] = useState("photos");
  const [lightbox, setLightbox] = useState(null); // photo index or null
  const [videoModal, setVideoModal] = useState(null); // youtube id or null

  const prev = () => setLightbox((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i + 1) % photos.length);

  return (
    <section
      id="gallery"
      className="section-pad"
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, #fdf8f5 100%)",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-desc">
            See the magic we create for every bride and client.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {["photos", "videos"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-7 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                tab === t ? "tab-active" : "border-pink-100 hover:border-pink-300 bg-white"
              }`}
              style={{ color: tab === t ? undefined : "var(--text)" }}
            >
              {t === "photos" ? "📷 Photos" : "🎬 Videos"}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <AnimatePresence mode="wait">
          {tab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  onClick={() => setLightbox(i)}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                      <Eye size={18} color="white" />
                    </div>
                    <span className="text-white text-sm font-medium">{photo.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Videos Grid */}
          {tab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  onClick={() => setVideoModal(video.youtubeId)}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-md bg-white border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={video.thumb}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ background: "rgba(190,24,93,0.9)" }}
                      >
                        <Play size={22} color="white" fill="white" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-medium">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                      {video.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} color="white" />
            </button>
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={24} color="white" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl"
              style={{ aspectRatio: "4/3" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                fill
                className="object-contain rounded-xl"
                sizes="90vw"
              />
            </motion.div>
            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={24} color="white" />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightbox + 1} / {photos.length} — {photos[lightbox].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setVideoModal(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setVideoModal(null)}
            >
              <X size={20} color="white" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoModal}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
