import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Palette, BarChart3, Shield, Cpu, Code2, Globe2, Sparkles } from "lucide-react";

const capabilities = [
  {
    icon: Globe2,
    title: "Web3 Mastery",
    desc: "Building dApps, smart contracts, and gasless protocols like SmoothSend. Expertise in Solidity & StarkNet.",
  },
  {
    icon: Code2,
    title: "Full-Stack Scaling",
    desc: "Crafting high-performance React/Next.js applications from concept to mainnet launch.",
  },
  {
    icon: Cpu,
    title: "AI & Agents",
    desc: "Developing autonomous agents for trading and automation on-chain. Built DefiZen for StarkNet.",
  },
  {
    icon: Sparkles,
    title: "Premium UI/UX",
    desc: "Obsessive focus on animations, micro-interactions, and glassmorphic aesthetics that WOW users.",
  },
];

const CapabilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="capabilities" className="py-24 md:py-32 px-6 overflow-hidden relative border-y border-white/5 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="liquid-glass rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-white/40 inline-block mb-6 border border-white/5"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif italic text-white leading-none tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Turning bold thinking<br className="hidden md:block" /> into <em className="italic transition-all hover:text-white/80">tangible outcomes</em>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="liquid-glass rounded-3xl p-8 space-y-6 border border-white/5 relative group hover:bg-white/5 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
            >
              <div className="liquid-glass rounded-2xl w-12 h-12 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Icon size={20} className="text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-serif italic text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{desc}</p>
              </div>
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
