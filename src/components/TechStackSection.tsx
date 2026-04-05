import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const row1 = [
  "StarkNet", "Solidity", "Avalanche","Move","Ethereum", "Hardhat", "Foundry", "Viem", "Ethers", "Move", "Aptos SDK"
];

const row2 = [
  "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "GSAP", "Node.js", "OpenAI", "LangChain", "Vite"
];

const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="stack" className="py-20 md:py-32 px-6 overflow-hidden relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="liquid-glass rounded-full px-4 py-1 text-[10px] font-medium text-white/40 uppercase tracking-[0.3em] inline-block mb-16 border border-white/5"
        >
          My Toolkit
        </motion.div>

        <div className="w-full relative overflow-hidden flex flex-col gap-12">
          {/* First Row Marquee (Right to Left) */}
          <div className="flex gap-16 whitespace-nowrap overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {[...row1, ...row1, ...row1].map((t, i) => (
                <span key={i} className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white/20 hover:text-white/90 transition-all duration-500 cursor-default" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
          
          <div className="w-full h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />

          {/* Second Row Marquee (Left to Right) */}
          <div className="flex gap-16 whitespace-nowrap overflow-hidden">
            <motion.div
              className="flex gap-16"
              animate={{ x: [-1000, 0] }}
              transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            >
              {[...row2, ...row2, ...row2].map((t, i) => (
                <span key={i} className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white/20 hover:text-white/90 transition-all duration-500 cursor-default" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center mt-12 gap-4"
          >
            <p className="text-white/30 text-sm md:text-base text-center max-w-xl font-light leading-relaxed">
              Engineering high-performance protocols and experiences with a deep focus on <span className="text-white/60">security, scalability, and aesthetic precision</span>.
            </p>
            <div className="w-12 h-px bg-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
