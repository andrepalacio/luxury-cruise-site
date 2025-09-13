"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function WelcomeOverlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowOverlay(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 text-expery-blue"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <Image
              src="/logos/expery_vertical.png"
              alt="Company Logo"
              width={200}
              height={200}
              priority
            />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-5xl font-bold font-serif mt-6 text-center tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: "Noto Serif, serif" }}
          >
            El Arte de Viajar
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
