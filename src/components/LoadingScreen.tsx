import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Build", "Ship", "Inspire"];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  // The black overlay is prerendered so it covers the page from first paint; its words and
  // counter appear only after mount so they are not the first text in the static HTML.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const duration = 2400; // Slightly faster for better UX
    const tick = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {mounted && (
        <>
          {/* Top left label */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white/40 text-xs uppercase tracking-[0.3em]">Portfolio — 2026</span>
          </motion.div>

          {/* Center rotating word */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="text-4xl md:text-7xl lg:text-8xl font-serif italic text-white/90"
                style={{ fontFamily: "'Instrument Serif', serif" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom counter + progress */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex justify-end mb-6">
              <span className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-white/20 tabular-nums leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <div className="h-[2px] bg-white/10 w-full rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white origin-left"
                style={{ width: `${count}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
