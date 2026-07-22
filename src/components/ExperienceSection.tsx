import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2026 — Now",
    title: "Product Developer",
    company: "EdTech Company",
    desc: "Building and improving software products for an education technology company, working across product thinking, frontend experiences, and practical engineering.",
    type: "Product"
  },
  {
    year: "2025 — Now",
    title: "Founder & Lead Architect",
    company: "SmoothSend.xyz",
    desc: "Building gasless transaction infrastructure for Aptos and Avalanche. SmoothSend has processed $3,000+ in volume while serving developers with a simpler, more reliable transaction experience.",
    type: "Startup"
  },
  {
    year: "2023 — Now",
    title: "Multiple Hackathon Champion",
    company: "Global Web3 Circuit",
    desc: "Earned 6+ wins and more than $3,815 in prizes across Avalanche, Starknet, Aptos, Neo X, and other ecosystems. Focused on cross-chain UX, agents, and account abstraction.",
    type: "Achievements"
  },
  {
    year: "2022 — Now",
    title: "Freelance Builder",
    company: "Independent / Open Source",
    desc: "Designing and shipping full-stack products for clients and communities, including an inventory management and POS billing system, AI agents, and Web3 applications.",
    type: "Freelance"
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="experience" className="py-24 md:py-40 px-6 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-4 font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Journey
          </h2>
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Professional Evolution & Milestones</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className="liquid-glass rounded-3xl p-8 flex flex-col justify-between border border-white/5 transition-all duration-500 hover:border-white/20 group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-4xl font-serif italic text-white/10 group-hover:text-white/40 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {m.year}
                  </span>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                    {m.type}
                  </span>
                </div>
                <h4 className="text-white text-xl font-medium mb-2">{m.title}</h4>
                <p className="text-white/40 text-xs tracking-wide uppercase mb-6 truncate">{m.company}</p>
                <p className="text-white/60 text-sm leading-relaxed font-light mb-8 group-hover:text-white/90 transition-colors">
                  {m.desc}
                </p>
              </div>
              
              <div className="w-full h-px bg-white/5 group-hover:bg-white/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
