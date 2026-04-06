import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2025",
    title: "Founder & Lead Architect",
    company: "SmoothSend.xyz",
    desc: "Architecting a gasless transfer SDK for Aptos & Avalanche. Scaling to 6,000+ monthly transactions with B2B pilot integrations.",
    type: "Startup"
  },
  {
    year: "2024",
    title: "Multiple Hackathon Champion",
    company: "Global Web3 Circuit",
    desc: "Earned 5+ major wins (StarkNet, Aptos, etc.) with over $3,715 in prize money. Focused on cross-chain UX and account abstraction.",
    type: "Achievements"
  },
  {
    year: "2025",
    title: "Protocol Research & Development",
    company: "Freelance / Open Source",
    desc: "Deep-diving into ZK-proofs and smart contract security. Built yield aggregators and autonomous AI agent prototypes.",
    type: "Freelance"
  },
  {
    year: "2022 - 2026",
    title: "ECE Undergrad",
    company: "MSIT",
    desc: "Mastering the fundamentals of hardware and software at Maharaja Surajmal Institute of Technology.",
    type: "Education"
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
