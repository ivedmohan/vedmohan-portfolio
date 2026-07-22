import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

const FeaturedProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="featured-project" className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden min-h-[550px] md:min-h-[650px] relative border border-white/5 bg-black/40 group"
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
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] z-[1]" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-[2]">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 w-full">
            <div className="liquid-glass aave-glass rounded-3xl p-8 md:p-10 max-w-xl backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium">
                  Flagship Protocol
                </p>
              </div>
              <h3 className="text-white text-3xl md:text-5xl font-serif italic mb-6 leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
                SmoothSend.xyz
              </h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                A high-performance gasless transfer SDK live on <span className="text-white/90">Aptos & Avalanche</span> mainnets. Pay fees in the same token you're sending—eliminating the need for native gas assets and simplifying user onboarding.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto">
              <motion.a
                href="https://www.smoothsend.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass aave-glass rounded-full px-12 py-5 text-white text-lg font-medium border border-white/10 hover:bg-white/10 transition-all text-center block md:mb-6 group/btn overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                <span className="relative z-10 italic">View Mainnet</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </motion.a>
              <p className="text-white/20 text-[10px] text-center hidden md:block uppercase tracking-widest">
                Scroll to explore more 
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjectSection;
