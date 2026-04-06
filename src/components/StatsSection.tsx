import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "$3,715+", label: "Prizes Won" },
  { value: "5+", label: "Hackathon Wins" },
  { value: "6,000+", label: "On-chain Transactions" },
  { value: "1", label: "Mainnet Integration (Sendra)" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="stats" className="bg-black py-16 md:py-24 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div 
                className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white/90 mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
