"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const VIDEO_SRC =
  "https://res.cloudinary.com/dynbpb9u0/video/upload/v1787479830/WhatsApp_Video_2026-08-23_at_15.37.54_ulvdsb.mp4";

export default function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);

  const dismiss = () => setVisible(false);

  useEffect(() => {
    if (!visible) return;

    // Safety net: never let a slow/broken video block the homepage.
    const fallback = window.setTimeout(dismiss, 15000);
    return () => window.clearTimeout(fallback);
  }, [visible]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-white"
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            onError={dismiss}
            className="max-h-[70vh] w-full max-w-xl rounded-2xl object-contain shadow-2xl sm:max-w-2xl"
          />

          <button
            type="button"
            onClick={dismiss}
            className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full border border-maroon-deep/20 bg-white/90 px-4 py-2 text-sm font-semibold text-maroon-deep shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            Skip
            <X className="size-4" aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
