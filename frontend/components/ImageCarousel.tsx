"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  height?: string; // Now accepts Tailwind classes like "h-[400px]"
}

export default function ImageCarousel({
  images,
  height = "h-[400px]",
}: Props) {
  const [[idx, direction], setState] = useState<[number, number]>([0, 0]);

  const prev = () =>
    setState(([i]) => [(i === 0 ? images.length - 1 : i - 1), -1]);
  const next = () =>
    setState(([i]) => [(i === images.length - 1 ? 0 : i + 1), 1]);

  return (
    <div className={`relative overflow-hidden ${height} rounded-lg`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={idx}
          className="absolute top-0 left-0 w-full h-full"
          custom={direction}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.7, ease: "anticipate" }}
        >
          <img
            src={images[idx]}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2">
        <button
          onClick={prev}
          aria-label="Previous"
          className="bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
}
