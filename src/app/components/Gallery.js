"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye, Play, Loader2 } from "lucide-react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("photos");
  const [lightbox, setLightbox] = useState(null); // photo index or null
  const [videoModal, setVideoModal] = useState(null); // youtube id or null
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success) {
          setPhotos(data.photos);
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const prev = () => setLightbox((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox((i) => (i + 1) % photos.length);

  return (
    <section
      id="gallery"
      className="section-pad"
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
              className={`px-7 py-2.5 rounded-full border text-sm font-semibold transition-all ${tab === t ? "tab-active" : "border-pink-100 hover:border-pink-300 bg-white"
                }`}
              style={{ color: tab === t ? undefined : "var(--text)" }}
            >
              {t === "photos" ? "📷 Photos" : "🎬 Videos"}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: "var(--primary)" }} />
          </div>
        ) : (
          <>
            {/* Photos Grid */}
            <AnimatePresence mode="wait">
              {tab === "photos" && (
                <div key="photos" className="flex flex-col items-center w-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 gap-2 sm:gap-4 w-full"
                  >
                    {(showAllPhotos ? photos : photos.slice(0, 9)).map((photo, i) => (
                      <motion.div
                        key={photo._id || photo.id || i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                        onClick={() => setLightbox(i)}
                        className="relative group cursor-pointer overflow-hidden shadow-sm aspect-square"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt || "Gallery Photo"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 33vw, 33vw"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                          <Eye size={20} color="white" />
                          <span className="text-white text-[10px] sm:text-xs font-medium mt-1 text-center hidden sm:block">{photo.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {!showAllPhotos && photos.length > 9 && (
                    <button 
                      onClick={() => setShowAllPhotos(true)}
                      className="mt-8 btn-outline text-sm"
                    >
                      View All Photos
                    </button>
                  )}
                </div>
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
                      key={video._id || video.id || i}
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
                          alt={video.title || "Gallery Video"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div
                            className="w-14 h-14  flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ background: "rgba(183,110,121,0.9)" }}
                          >
                            <Play size={22} color="white" fill="white" />
                          </div>
                        </div>
                        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1  font-medium">
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
          </>
        )}
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
              className="absolute top-5 right-5 w-10 h-10  bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} color="white" />
            </button>
            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10  bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
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
              className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10  bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
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
              className="absolute top-5 right-5 w-10 h-10  bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
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
