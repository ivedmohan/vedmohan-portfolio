import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

const FeaturedProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="projects" className="bg-background pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden aspect-video relative"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <video
          src={VIDEO_URL}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end md:items-end justify-between gap-6">
          <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
            <p className="text-foreground/50 text-xs tracking-widest uppercase mb-3">
              Flagship Project
            </p>
            <h3 className="text-white text-2xl font-semibold mb-2">SmoothSend.xyz</h3>
            <p className="text-foreground text-sm md:text-base leading-relaxed">
              A gasless token transfer SDK live on Aptos & Avalanche mainnets. Pay fees in the same token you're sending—no native gas required.
            </p>
          </div>
          <motion.a
            href="https://www.smoothsend.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-3 text-foreground text-sm font-medium flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Mainnet
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjectSection;
