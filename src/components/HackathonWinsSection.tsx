import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Star, Zap } from "lucide-react";

const wins = [
  {
    title: "$1,500 AVAX",
    subtitle: "Avalanche India Pitch Day Finalist",
    description: "Top 5 out of 3500+ teams across India.",
    icon: Trophy,
  },
  {
    title: "$1,000 Bounty",
    subtitle: "StarkNet Hacker House Bangalore",
    description: "Built DefiZen AI Agent for StarkNet ecosystem.",
    icon: Award,
  },
  {
    title: "$700 AVAX",
    subtitle: "Team 1 Delhi Hackathon",
    description: "Winner for innovative cross-chain tooling.",
    icon: Star,
  },
  {
    title: "$400 Bounty",
    subtitle: "Neo X Grind Hackathon",
    description: "Best deployment and interaction on Neo X.",
    icon: Zap,
  },
  {
    title: "$115 Akash Track Winner",
    subtitle: "HackOdisha 5.0",
    description: "Best deployment on Akash decentralized cloud.",
    icon: Trophy,
  },
  {
    title: "$100 AVAX",
    subtitle: "AVAX Speedrun Winner",
    description: "Recognized for building and shipping on Avalanche during the AVAX Speedrun.",
    icon: Zap,
  },
  {
    title: "Aptos Alumni",
    subtitle: "Winter School Recognition",
    description: "Mainnet integrations and project recognition.",
    icon: Award,
  },
];

const HackathonWinsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="wins" className="relative py-28 md:py-40 px-6 overflow-hidden bg-black">
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
        muted autoPlay loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[1]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight mb-4 font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Hackathon Wins
          </h2>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Recognition & Achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wins.map((win, i) => (
            <motion.div
              key={i}
              className="liquid-glass rounded-3xl p-6 md:p-8 flex flex-col h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                <div className="liquid-glass rounded-2xl w-12 h-12 flex items-center justify-center">
                  <win.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {win.title}
              </h3>
              <p className="text-white/60 text-sm font-medium mb-3">
                {win.subtitle}
              </p>
              <p className="text-white/40 text-sm leading-relaxed mt-auto">
                {win.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonWinsSection;
