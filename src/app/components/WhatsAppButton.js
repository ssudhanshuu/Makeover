"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border"
            style={{ borderColor: "#e5e7eb", whiteSpace: "nowrap" }}
          >
            💬 Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/917300685744"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="wp-pulse w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={26} color="white" fill="white" />
      </motion.a>
    </div>
  );
}
