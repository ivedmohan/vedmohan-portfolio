import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const tech = [
  "StarkNet", "Solidity", "Avalanche", "Ethereum", "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "GSAP", "Node.js", "OpenAI", "LangChain"
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="stack" className="py-20 md:py-28 px-6 overflow-hidden relative bg-black">
      <div className="max-w-6xl mx-auto relative flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="liquid-glass rounded-full px-3.5 py-1 text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] inline-block mb-10 border border-white/5"
        >
          My Toolkit
        </motion.div>

        <div className="w-full relative overflow-hidden flex flex-col gap-8">
          {/* First Row Marquee */}
          <div className="flex gap-16 whitespace-nowrap overflow-hidden group">
            <motion.div
              className="flex gap-16"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...tech, ...tech].map((t, i) => (
                <span key={i} className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white/20 hover:text-white/80 transition-colors cursor-default" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
          
          <div className="w-full h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-white/30 text-xs md:text-sm text-center max-w-lg mt-4"
          >
            Always shipping with modern tooling and high-end tech stacks that deliver exceptional performance and security.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
